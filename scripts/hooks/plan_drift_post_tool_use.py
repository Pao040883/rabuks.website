#!/usr/bin/env python3
import json
import sys

inp = json.load(sys.stdin)
tool = inp.get('tool_name', '') or ''
tool_input = inp.get('tool_input', {}) or {}


def tool_is(*names):
    for name in names:
        if tool == name or tool.endswith('/' + name):
            return True
    return False


def extract_paths(ti):
    paths = []
    if not isinstance(ti, dict):
        return paths
    for key in ('files', 'file', 'filePath', 'path'):
        val = ti.get(key)
        if isinstance(val, list):
            paths.extend(val)
        elif isinstance(val, str):
            paths.append(val)
    return [str(p).replace('\\', '/') for p in paths]


EDIT_TOOLS = (
    'editFiles', 'createFile', 'createDirectory',
    'replace_string_in_file', 'multi_replace_string_in_file',
    'create_file', 'create_directory',
)

if not tool_is(*EDIT_TOOLS):
    print(json.dumps({'continue': True}))
    raise SystemExit

paths = extract_paths(tool_input)
changed = [p for p in paths if not p.startswith('docs/ai/')]
if not changed:
    print(json.dumps({'continue': True}))
    raise SystemExit

recommended = {'docs/ai/PLAN.md', 'docs/ai/STATUS.md', 'docs/ai/DECISIONS.md'}
text = ' '.join(changed).lower()

backend_markers = ('api/', 'views', 'serializer', 'router', 'endpoint', 'controller', 'service', 'backend', 'django', 'fastapi', 'flask')
db_markers = ('migration', 'models', 'schema', 'sql', 'alembic', 'entity', 'repository')
ops_markers = ('docker', 'compose', 'nginx', 'deploy', 'infra', '.github/workflows', 'helm', 'terraform')
obs_markers = ('logging', 'logger', 'metrics', 'tracing', 'observability', 'monitor')
security_markers = ('auth', 'permission', 'csrf', 'cors', 'cookie', 'secret', 'jwt', 'oauth', 'tenant')
frontend_markers = ('component', 'page', 'route', 'frontend', 'ui', 'template', 'view', 'angular', 'react', 'vue')

if any(m in text for m in backend_markers):
    recommended.add('docs/ai/API_MAP.md')
    recommended.add('docs/ai/ARCHITECTURE.md')
if any(m in text for m in db_markers):
    recommended.add('docs/ai/DB_MAP.md')
    recommended.add('docs/ai/MIGRATION_POLICY.md')
if any(m in text for m in ops_markers):
    recommended.add('docs/ai/OBSERVABILITY.md')
    recommended.add('docs/ai/VERSIONING.md')
    recommended.add('docs/ai/ARCHITECTURE.md')
if any(m in text for m in obs_markers):
    recommended.add('docs/ai/LOGGING_POLICY.md')
    recommended.add('docs/ai/OBSERVABILITY.md')
if any(m in text for m in security_markers):
    recommended.add('docs/ai/SECURITY_BASELINE.md')
    recommended.add('docs/ai/API_MAP.md')
if any(m in text for m in frontend_markers):
    recommended.add('docs/ai/FRONTEND_TESTING.md')
    recommended.add('docs/ai/ARCHITECTURE.md')

msg = (
    'Edits detected outside docs/ai. Update project memory if behavior, architecture, '
    'contracts, operations, or assumptions changed. Recommended files: ' + ', '.join(sorted(recommended))
)

print(json.dumps({
    'continue': True,
    'hookSpecificOutput': {
        'hookEventName': 'PostToolUse',
        'additionalContext': msg
    }
}))
