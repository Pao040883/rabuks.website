#!/usr/bin/env python3
import json
import sys
from pathlib import Path

inp = json.load(sys.stdin)
repo = Path(inp.get('cwd', '.')).resolve()


def exists(*patterns):
    for pat in patterns:
        if list(repo.glob(pat)):
            return True
    return False


def read_text(rel):
    p = repo / rel
    try:
        return p.read_text(encoding='utf-8', errors='ignore')
    except Exception:
        return ''


detected = []
package_json = read_text('package.json')
requirements = read_text('requirements.txt') + '\n' + read_text('pyproject.toml')
go_mod = read_text('go.mod')
cargo_toml = read_text('Cargo.toml')
pom_xml = read_text('pom.xml')
gradle = read_text('build.gradle') + '\n' + read_text('build.gradle.kts')
csproj = '\n'.join(read_text(str(path.relative_to(repo))) for path in repo.glob('**/*.csproj'))

if exists('**/angular.json'):
    detected.append('frontend: angular')
elif 'next' in package_json.lower():
    detected.append('frontend: next-like')
elif 'vite' in package_json.lower():
    detected.append('frontend: vite-like')
elif 'react' in package_json.lower():
    detected.append('frontend: react-like')
elif 'vue' in package_json.lower():
    detected.append('frontend: vue-like')

if exists('**/manage.py') and (exists('**/settings.py') or 'django' in requirements.lower()):
    detected.append('backend: django')
elif 'fastapi' in requirements.lower():
    detected.append('backend: fastapi')
elif 'flask' in requirements.lower():
    detected.append('backend: flask')
elif 'express' in package_json.lower() or 'nest' in package_json.lower():
    detected.append('backend: node-like')
elif go_mod:
    detected.append('backend: go-like')
elif 'spring' in pom_xml.lower() or 'spring' in gradle.lower():
    detected.append('backend: spring-like')
elif csproj:
    detected.append('backend: dotnet-like')
elif 'rails' in read_text('Gemfile').lower():
    detected.append('backend: rails-like')
elif cargo_toml:
    detected.append('backend: rust-like')

if 'postgres' in requirements.lower() or 'psycopg' in requirements.lower() or 'postgres' in package_json.lower():
    detected.append('data: postgres-likely')
if 'mysql' in requirements.lower() or 'mysql' in package_json.lower():
    detected.append('data: mysql-likely')
if 'mongodb' in requirements.lower() or 'mongodb' in package_json.lower():
    detected.append('data: mongo-likely')
if 'redis' in requirements.lower() or 'redis' in package_json.lower():
    detected.append('cache-or-queue: redis-likely')
if 'celery' in requirements.lower():
    detected.append('jobs: celery-likely')
if 'rq' in requirements.lower():
    detected.append('jobs: rq-likely')
if 'sidekiq' in read_text('Gemfile').lower():
    detected.append('jobs: sidekiq-likely')
if exists('docker-compose.yml', 'compose.yml', 'compose.yaml', 'Dockerfile', '**/Dockerfile'):
    detected.append('ops: containers-present')
if exists('.github/workflows/*.yml', '.github/workflows/*.yaml'):
    detected.append('ci: github-actions-present')
if exists('Jenkinsfile'):
    detected.append('ci: jenkins-present')
if exists('.gitlab-ci.yml'):
    detected.append('ci: gitlab-present')

memory_files = [
    'docs/ai/BASELINE.md',
    'docs/ai/ARCHITECTURE.md',
    'docs/ai/API_MAP.md',
    'docs/ai/DB_MAP.md',
    'docs/ai/PLAN.md',
    'docs/ai/STATUS.md',
    'docs/ai/DECISIONS.md',
]
missing = [p for p in memory_files if not (repo / p).exists()]
weak = []
for p in memory_files:
    fp = repo / p
    if fp.exists():
        txt = fp.read_text(encoding='utf-8', errors='ignore').lower()
        if 'not yet verified' in txt or 'not yet collected' in txt or 'not yet established' in txt:
            weak.append(p)

notes = []
notes.append('Detected stack: ' + (', '.join(detected) if detected else 'no strong detection yet'))
if missing:
    notes.append('Missing project memory: ' + ', '.join(missing))
if weak:
    notes.append('Memory likely needs evidence refresh: ' + ', '.join(weak))
if not missing and not weak:
    notes.append('Project memory exists; verify it before major changes if critical areas are touched.')

print(json.dumps({
    'hookSpecificOutput': {
        'hookEventName': 'SessionStart',
        'additionalContext': ' | '.join(notes)
    }
}))
