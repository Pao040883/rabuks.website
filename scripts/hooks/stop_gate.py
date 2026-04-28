#!/usr/bin/env python3
import json
import subprocess
import sys

inp = json.load(sys.stdin)
stop_hook_active = bool(inp.get('stop_hook_active', False))


def ok():
    print(json.dumps({'continue': True}))


if stop_hook_active:
    ok()
    raise SystemExit


def git_cmd(args):
    try:
        out = subprocess.check_output(args, stderr=subprocess.DEVNULL)
        return out.decode('utf-8').splitlines()
    except Exception:
        return []


def in_git_repo():
    try:
        subprocess.check_output(
            ['git', 'rev-parse', '--is-inside-work-tree'],
            stderr=subprocess.DEVNULL,
        )
        return True
    except Exception:
        return False


if not in_git_repo():
    print(json.dumps({
        'hookSpecificOutput': {
            'hookEventName': 'Stop',
            'decision': 'block',
            'reason': (
                'Stop-gate enforcement requires a Git worktree. Initialize Git or run this template inside a repository '
                'so project-memory drift can be checked reliably.'
            ),
        }
    }))
    raise SystemExit


changed = set(git_cmd(['git', 'diff', '--name-only']))
changed |= set(git_cmd(['git', 'diff', '--name-only', '--cached']))
changed |= set(git_cmd(['git', 'ls-files', '--others', '--exclude-standard']))

if not changed:
    ok()
    raise SystemExit

norm = {p.replace('\\', '/') for p in changed}
ai_docs = {p for p in norm if p.startswith('docs/ai/')}
non_ai = {p for p in norm if not p.startswith('docs/ai/')}

if not non_ai:
    ok()
    raise SystemExit

required_core = {
    'docs/ai/PLAN.md',
    'docs/ai/STATUS.md',
    'docs/ai/DECISIONS.md',
}

required_contextual = set()
text = ' '.join(sorted(non_ai)).lower()
if any(k in text for k in ('migration', 'models', 'schema', 'sql', 'alembic')):
    required_contextual |= {'docs/ai/DB_MAP.md', 'docs/ai/MIGRATION_POLICY.md'}
if any(k in text for k in ('auth', 'permission', 'csrf', 'cors', 'cookie', 'jwt', 'oauth', 'tenant')):
    required_contextual |= {'docs/ai/SECURITY_BASELINE.md', 'docs/ai/API_MAP.md'}
if any(k in text for k in ('docker', 'compose', 'nginx', 'deploy', 'workflow', 'infra', 'helm', 'terraform')):
    required_contextual |= {'docs/ai/OBSERVABILITY.md', 'docs/ai/ARCHITECTURE.md'}
if any(k in text for k in ('api', 'views', 'router', 'serializer', 'endpoint', 'controller')):
    required_contextual |= {'docs/ai/API_MAP.md'}

core_touched = required_core.issubset(ai_docs)
context_touched = required_contextual.issubset(ai_docs)

if core_touched and context_touched:
    ok()
    raise SystemExit

reason = (
    'Code or infra changes were detected without sufficient project-memory updates. '
    'Update docs/ai/PLAN.md, docs/ai/STATUS.md, docs/ai/DECISIONS.md and any relevant technical memory files before finishing.'
)
if required_contextual:
    reason += ' Suggested contextual files: ' + ', '.join(sorted(required_contextual))

print(json.dumps({
    'hookSpecificOutput': {
        'hookEventName': 'Stop',
        'decision': 'block',
        'reason': reason,
    }
}))
