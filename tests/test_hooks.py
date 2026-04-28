import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
HOOKS = ROOT / 'scripts' / 'hooks'
AGENTS_DIR = ROOT / '.github' / 'agents'
PROMPTS_DIR = ROOT / '.github' / 'prompts'
SKILLS_DIR = ROOT / '.github' / 'skills'
WORKFLOWS_DIR = ROOT / '.github' / 'workflows'
GITHUB_DIR = ROOT / '.github'
ISSUE_TEMPLATE_DIR = GITHUB_DIR / 'ISSUE_TEMPLATE'
WORKFLOW_TEMPLATES_DIR = GITHUB_DIR / 'workflow-templates'
BOOTSTRAP_SCRIPT = ROOT / 'scripts' / 'bootstrap' / 'install_orchestrator.sh'
ORCHESTRATOR_VERSION_FILE = ROOT / 'ORCHESTRATOR_VERSION'
CHANGELOG_FILE = ROOT / 'CHANGELOG.md'


def hook_path(name):
    return HOOKS / name


def run_hook(name, payload, cwd=None):
    proc = subprocess.run(
        [sys.executable, str(hook_path(name))],
        input=json.dumps(payload),
        text=True,
        capture_output=True,
        cwd=cwd or ROOT,
        check=False,
    )
    return json.loads(proc.stdout)


def init_git_repo(path):
    run_cmd(['git', 'init'], path)
    run_cmd(['git', 'config', 'user.email', 'test@example.com'], path)
    run_cmd(['git', 'config', 'user.name', 'Test User'], path)


def run_cmd(args, cwd):
    subprocess.run(args, cwd=cwd, check=True, capture_output=True, text=True)


def write_file(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding='utf-8')


class PolicyPreToolUseTests(unittest.TestCase):
    def test_governance_edit_requires_confirmation(self):
        result = run_hook(
            'policy_pre_tool_use.py',
            {
                'tool_name': 'create_file',
                'tool_input': {'filePath': '.github/prompts/new.prompt.md'},
            },
        )
        output = result['hookSpecificOutput']
        self.assertEqual(output['permissionDecision'], 'ask')

    def test_tech_lead_cannot_edit_outside_ai_docs(self):
        result = run_hook(
            'policy_pre_tool_use.py',
            {
                'tool_name': 'create_file',
                'agentName': 'Tech Lead',
                'tool_input': {'filePath': 'src/app.py'},
            },
        )
        output = result['hookSpecificOutput']
        self.assertEqual(output['permissionDecision'], 'deny')


class StopGateTests(unittest.TestCase):
    def test_blocks_outside_git_repo(self):
        with tempfile.TemporaryDirectory() as tmp:
            result = run_hook('stop_gate.py', {}, cwd=tmp)
        output = result['hookSpecificOutput']
        self.assertEqual(output['decision'], 'block')
        self.assertIn('Git worktree', output['reason'])

    def test_requires_all_core_memory_files(self):
        with tempfile.TemporaryDirectory() as tmp:
            repo = Path(tmp)
            init_git_repo(repo)
            write_file(repo / 'service.py', 'print("hi")\n')
            write_file(repo / 'docs/ai/PLAN.md', 'plan\n')
            run_cmd(['git', 'add', '.'], repo)
            result = run_hook('stop_gate.py', {}, cwd=repo)
        output = result['hookSpecificOutput']
        self.assertEqual(output['decision'], 'block')
        self.assertIn('STATUS.md', output['reason'])

    def test_passes_when_core_memory_is_updated(self):
        with tempfile.TemporaryDirectory() as tmp:
            repo = Path(tmp)
            init_git_repo(repo)
            write_file(repo / 'service.py', 'print("hi")\n')
            write_file(repo / 'docs/ai/PLAN.md', 'plan\n')
            write_file(repo / 'docs/ai/STATUS.md', 'status\n')
            write_file(repo / 'docs/ai/DECISIONS.md', 'decisions\n')
            run_cmd(['git', 'add', '.'], repo)
            result = run_hook('stop_gate.py', {}, cwd=repo)
        self.assertTrue(result['continue'])


class SessionStartTests(unittest.TestCase):
    def test_detects_broader_stack_signals(self):
        with tempfile.TemporaryDirectory() as tmp:
            repo = Path(tmp)
            write_file(repo / 'package.json', '{"dependencies": {"next": "latest"}}\n')
            write_file(repo / 'go.mod', 'module demo\n')
            write_file(repo / '.github/workflows/test.yml', 'name: test\n')
            result = run_hook('session_start.py', {'cwd': str(repo)}, cwd=repo)
        context = result['hookSpecificOutput']['additionalContext']
        self.assertIn('frontend: next-like', context)
        self.assertIn('backend: go-like', context)
        self.assertIn('ci: github-actions-present', context)


class AgentSchemaTests(unittest.TestCase):
    def test_agents_use_non_deprecated_frontmatter_key(self):
        for path in AGENTS_DIR.glob('*.agent.md'):
            text = path.read_text(encoding='utf-8')
            self.assertNotIn('user-invokable:', text, path.name)

    def test_specialists_include_required_handover_fields(self):
        required_fields = (
            '- Objective',
            '- Risks',
            '- Assumptions / uncertainties',
            '- Tests',
            '- Security relevance',
            '- Recommended next step',
        )
        for path in AGENTS_DIR.glob('*.agent.md'):
            if path.name == 'tech-lead.agent.md':
                continue
            text = path.read_text(encoding='utf-8')
            for field in required_fields:
                self.assertIn(field, text, f'{path.name} missing {field}')


class PromptAndSkillConsistencyTests(unittest.TestCase):
    def test_readme_workflows_have_prompt_files(self):
        expected = (
            'kickoff.prompt.md',
            'extend-existing-system.prompt.md',
            'requirements-discovery.prompt.md',
            'implement.prompt.md',
            'release-readiness.prompt.md',
        )
        for name in expected:
            self.assertTrue((PROMPTS_DIR / name).exists(), name)

    def test_prompts_include_frontmatter_and_output_section(self):
        for path in PROMPTS_DIR.glob('*.prompt.md'):
            text = path.read_text(encoding='utf-8')
            self.assertTrue(text.startswith('---\n'), path.name)
            self.assertIn('description:', text, path.name)
            self.assertIn('argument-hint:', text, path.name)
            self.assertIn('## Output', text, path.name)
            self.assertIn('## Example input', text, path.name)

    def test_greenfield_prompts_enforce_minimal_critical_questions(self):
        kickoff = (PROMPTS_DIR / 'kickoff.prompt.md').read_text(encoding='utf-8')
        discovery = (PROMPTS_DIR / 'requirements-discovery.prompt.md').read_text(
            encoding='utf-8'
        )
        self.assertIn('smallest set of critical follow-up questions', kickoff)
        self.assertIn('1 to 5 targeted questions', kickoff)
        self.assertIn('smallest useful clarification set', discovery)


class TechLeadContractTests(unittest.TestCase):
    def test_tech_lead_agent_requires_self_directed_intake(self):
        text = (AGENTS_DIR / 'tech-lead.agent.md').read_text(encoding='utf-8')
        self.assertIn('## Intake behavior', text)
        self.assertIn('Ask only the smallest set of missing questions', text)
        self.assertIn('Build the first trustworthy `docs/ai/*` baseline', text)

    def test_skills_include_usage_and_references_sections(self):
        for path in SKILLS_DIR.glob('*/SKILL.md'):
            text = path.read_text(encoding='utf-8')
            self.assertIn('## When to use', text, path.parent.name)
            self.assertIn('## References', text, path.parent.name)

    def test_django_angular_profile_is_explicitly_optional(self):
        text = (SKILLS_DIR / 'django-angular-profile' / 'SKILL.md').read_text(
            encoding='utf-8'
        )
        self.assertIn('optional preference profile', text)
        self.assertIn('must not override repository evidence', text)


class WorkflowConsistencyTests(unittest.TestCase):
    def test_contract_workflow_exists(self):
        path = WORKFLOWS_DIR / 'orchestrator-contracts.yml'
        self.assertTrue(path.exists(), path.name)

    def test_contract_workflow_runs_unittest_suite(self):
        text = (WORKFLOWS_DIR / 'orchestrator-contracts.yml').read_text(
            encoding='utf-8'
        )
        self.assertIn('python -m unittest discover -s tests', text)

    def test_contract_workflow_checks_template_release_metadata(self):
        text = (WORKFLOWS_DIR / 'orchestrator-contracts.yml').read_text(
            encoding='utf-8'
        )
        self.assertIn('ORCHESTRATOR_VERSION', text)
        self.assertIn('CHANGELOG.md', text)

    def test_security_workflow_exists_with_scanning_steps(self):
        text = (WORKFLOWS_DIR / 'security-hygiene.yml').read_text(encoding='utf-8')
        self.assertIn('gitleaks/gitleaks-action', text)
        self.assertIn('github/codeql-action/init', text)

    def test_optional_workflow_templates_exist(self):
        expected = (
            'python-package-hygiene.yml',
            'python-package-hygiene.properties.json',
            'node-package-hygiene.yml',
            'node-package-hygiene.properties.json',
            'container-image-hygiene.yml',
            'container-image-hygiene.properties.json',
        )
        for name in expected:
            self.assertTrue((WORKFLOW_TEMPLATES_DIR / name).exists(), name)

    def test_optional_workflow_templates_cover_python_node_and_container(self):
        checks = {
            'python-package-hygiene.yml': 'pip-audit',
            'node-package-hygiene.yml': 'npm audit',
            'container-image-hygiene.yml': 'aquasecurity/trivy-action',
        }
        for name, marker in checks.items():
            text = (WORKFLOW_TEMPLATES_DIR / name).read_text(encoding='utf-8')
            self.assertIn(marker, text, name)

    def test_pull_request_template_exists_and_mentions_memory(self):
        text = (GITHUB_DIR / 'pull_request_template.md').read_text(encoding='utf-8')
        self.assertIn('## Project Memory', text)
        self.assertIn('docs/ai/*', text)
        self.assertIn('## Risk Review', text)

    def test_dependabot_exists_for_github_actions(self):
        text = (GITHUB_DIR / 'dependabot.yml').read_text(encoding='utf-8')
        self.assertIn('package-ecosystem: github-actions', text)
        self.assertIn('interval: weekly', text)


class GovernanceTemplateTests(unittest.TestCase):
    def test_codeowners_exists_for_governance_surfaces(self):
        text = (GITHUB_DIR / 'CODEOWNERS').read_text(encoding='utf-8')
        self.assertIn('/.github/agents/', text)
        self.assertIn('/scripts/hooks/', text)
        self.assertIn('/docs/ai/', text)

    def test_issue_templates_exist(self):
        expected = (
            'bug_report.md',
            'feature_request.md',
            'incident-report.md',
            'operational-change.md',
            'config.yml',
        )
        for name in expected:
            self.assertTrue((ISSUE_TEMPLATE_DIR / name).exists(), name)

    def test_issue_templates_cover_memory_and_risk(self):
        for name in (
            'bug_report.md',
            'feature_request.md',
            'incident-report.md',
            'operational-change.md',
        ):
            text = (ISSUE_TEMPLATE_DIR / name).read_text(encoding='utf-8')
            self.assertIn('Project Memory', text, name)
            self.assertIn('docs/ai/*', text, name)

    def test_release_checklist_exists(self):
        text = (GITHUB_DIR / 'release-checklist.md').read_text(encoding='utf-8')
        self.assertIn('## Project Memory', text)
        self.assertIn('## Risk and rollout', text)


class BootstrapAssetsTests(unittest.TestCase):
    def test_bootstrap_script_exists_and_mentions_next_steps(self):
        text = BOOTSTRAP_SCRIPT.read_text(encoding='utf-8')
        self.assertIn('Usage:', text)
        self.assertIn('--mode greenfield|existing', text)
        self.assertIn('--with-optional-workflows', text)
        self.assertIn('.github/orchestrator-template.json', text)
        self.assertIn('Next steps:', text)
        self.assertIn('extend-existing-system', text)

    def test_bootstrap_guide_exists(self):
        text = (ROOT / 'BOOTSTRAP.md').read_text(encoding='utf-8')
        self.assertIn('## Scripted bootstrap', text)
        self.assertIn('## Standard rollout process', text)
        self.assertIn('install_orchestrator.sh', text)

    def test_orchestrator_version_file_exists(self):
        text = ORCHESTRATOR_VERSION_FILE.read_text(encoding='utf-8').strip()
        self.assertRegex(text, r'^\d+\.\d+\.\d+$')

    def test_changelog_contains_current_template_version(self):
        version = ORCHESTRATOR_VERSION_FILE.read_text(encoding='utf-8').strip()
        text = CHANGELOG_FILE.read_text(encoding='utf-8')
        self.assertIn('Target repositories do not need to adopt this release process.', text)
        self.assertIn(f'## {version} - ', text)

    def test_bootstrap_installs_manifest_without_overwriting_existing_readme(self):
        with tempfile.TemporaryDirectory() as tmp:
            target = Path(tmp) / 'target'
            target.mkdir(parents=True)
            write_file(target / 'README.md', 'existing readme\n')

            proc = subprocess.run(
                [
                    'bash',
                    str(BOOTSTRAP_SCRIPT),
                    '--mode',
                    'existing',
                    str(target),
                ],
                cwd=ROOT,
                check=False,
                capture_output=True,
                text=True,
            )

            self.assertEqual(proc.returncode, 0, proc.stderr)
            self.assertEqual(
                (target / 'README.md').read_text(encoding='utf-8'),
                'existing readme\n',
            )
            self.assertTrue((target / 'AGENTS.md').exists())

            manifest = json.loads(
                (target / '.github' / 'orchestrator-template.json').read_text(
                    encoding='utf-8'
                )
            )
            self.assertEqual(
                manifest['template_version'],
                ORCHESTRATOR_VERSION_FILE.read_text(encoding='utf-8').strip(),
            )
            self.assertEqual(manifest['mode'], 'existing')
            self.assertFalse(manifest['copied_optional_workflows'])

    def test_greenfield_mode_can_copy_optional_workflows(self):
        with tempfile.TemporaryDirectory() as tmp:
            target = Path(tmp) / 'target'

            proc = subprocess.run(
                [
                    'bash',
                    str(BOOTSTRAP_SCRIPT),
                    '--mode',
                    'greenfield',
                    '--with-optional-workflows',
                    str(target),
                ],
                cwd=ROOT,
                check=False,
                capture_output=True,
                text=True,
            )

            self.assertEqual(proc.returncode, 0, proc.stderr)
            self.assertTrue((target / 'README.md').exists())
            self.assertTrue(
                (target / '.github' / 'workflow-templates' / 'node-package-hygiene.yml').exists()
            )

    def test_policy_docs_have_suggested_sections(self):
        checks = {
            'OBSERVABILITY.md': '## Suggested sections for adopting repositories',
            'VERSIONING.md': '## Suggested sections for adopting repositories',
            'SECURITY_BASELINE.md': '## Suggested sections for adopting repositories',
            'FRONTEND_TESTING.md': '## Suggested sections for adopting repositories',
        }
        for name, marker in checks.items():
            text = (ROOT / 'docs' / 'ai' / name).read_text(encoding='utf-8')
            self.assertIn(marker, text, name)


if __name__ == '__main__':
    unittest.main()