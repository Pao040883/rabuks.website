#!/usr/bin/env python3
import json
import re
import sys

inp = json.load(sys.stdin)
tool = inp.get('tool_name', '') or ''
tool_input = inp.get('tool_input', {}) or {}
agent = (inp.get('agentName', '') or '').lower()


def deny(reason):
    return {
        'continue': True,
        'hookSpecificOutput': {
            'hookEventName': 'PreToolUse',
            'permissionDecision': 'deny',
            'permissionDecisionReason': reason,
        },
    }


def ask(reason):
    return {
        'continue': True,
        'hookSpecificOutput': {
            'hookEventName': 'PreToolUse',
            'permissionDecision': 'ask',
            'permissionDecisionReason': reason,
        },
    }


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

paths = extract_paths(tool_input)
protected_prefixes = (
    '.github/agents/',
    '.github/hooks/',
    '.github/prompts/',
    '.github/skills/',
    '.github/instructions/',
    'scripts/hooks/',
)
protected_files = ('AGENTS.md', '.github/copilot-instructions.md')

if tool_is(*EDIT_TOOLS):
    touches_protected = any(any(p.startswith(prefix) for prefix in protected_prefixes) for p in paths)
    touches_protected = touches_protected or any(p in protected_files for p in paths)
    if touches_protected:
        print(json.dumps(ask('Editing governance files requires confirmation because prompts, skills, instructions, contracts, agents, and hooks shape system behavior.')))
        raise SystemExit

if 'tech lead' in agent and tool_is(*EDIT_TOOLS):
    outside = [p for p in paths if not p.startswith('docs/ai/')]
    if outside:
        print(json.dumps(deny('Tech Lead may write only under docs/ai/*. Delegate code or config edits to a specialist agent.')))
        raise SystemExit

if tool_is('runInTerminal', 'run_in_terminal'):
    cmd = ''
    if isinstance(tool_input, dict):
        cmd = str(tool_input.get('command', '') or tool_input.get('cmd', '') or '')
    risky = [
        r'\brm\s+-rf\b',
        r'\brm\s+-r\b.*\s+/\b',
        r'\bdd\s+if=',
        r'\bmkfs\.',
        r'\bshutdown\b',
        r'\breboot\b',
        r'\bdrop\s+table\b',
        r'\btruncate\s+table\b',
        r'\bterraform\s+destroy\b',
    ]
    if any(re.search(pat, cmd, re.IGNORECASE) for pat in risky):
        print(json.dumps(deny('Blocked potentially destructive command by policy.')))
        raise SystemExit

    critical_words = ('migration', 'alembic', 'manage.py migrate', 'kubectl', 'helm', 'terraform apply', 'psql', 'mysql', 'dropdb')
    if any(word in cmd.lower() for word in critical_words):
        print(json.dumps(ask('Potentially high-impact operational or database command detected. Confirm intent and ensure DBA/DevOps involvement where needed.')))
        raise SystemExit

print(json.dumps({'continue': True}))
