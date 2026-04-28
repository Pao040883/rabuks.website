#!/usr/bin/env python3
# Check repository Python style limits:
# - max 14 non-blank, non-comment lines per function (excluding docstring)
# - max 400 total lines per file

import ast
import sys
from pathlib import Path

MAX_FUNC_LINES = 14
MAX_FILE_LINES = 400

def nonblank_noncomment_lines(lines):
    count = 0
    for ln in lines:
        s = ln.strip()
        if not s:
            continue
        if s.startswith("#"):
            continue
        count += 1
    return count

def is_docstring_stmt(stmt):
    return (
        isinstance(stmt, ast.Expr)
        and isinstance(stmt.value, (ast.Str, ast.Constant))
        and isinstance(getattr(stmt.value, "value", None), str)
    )

def check_file(path: Path):
    text = path.read_text(encoding="utf-8")
    all_lines = text.splitlines()
    errors = []

    if len(all_lines) > MAX_FILE_LINES:
        errors.append(f"{path}: file has {len(all_lines)} lines (max {MAX_FILE_LINES})")

    try:
        tree = ast.parse(text)
    except SyntaxError as e:
        errors.append(f"{path}: SyntaxError: {e}")
        return errors

    def check_func(node):
        if not hasattr(node, "end_lineno") or node.end_lineno is None:
            return []
        body = list(node.body or [])
        if body and is_docstring_stmt(body[0]):
            body = body[1:]
        if not body:
            return []
        start = getattr(body[0], "lineno", node.lineno)
        end = getattr(body[-1], "end_lineno", body[-1].lineno)
        seg = all_lines[start - 1 : end]
        c = nonblank_noncomment_lines(seg)
        if c > MAX_FUNC_LINES:
            return [f"{path}:{node.lineno} {node.name}() has {c} effective lines (max {MAX_FUNC_LINES})"]
        return []

    class V(ast.NodeVisitor):
        def visit_FunctionDef(self, node):  # noqa: N802
            errors.extend(check_func(node))
            self.generic_visit(node)

        def visit_AsyncFunctionDef(self, node):  # noqa: N802
            errors.extend(check_func(node))
            self.generic_visit(node)

    V().visit(tree)
    return errors

def main():
    roots = [Path(p) for p in sys.argv[1:]] or [Path(".")]
    py_files = []
    for r in roots:
        if r.is_file() and r.suffix == ".py":
            py_files.append(r)
        elif r.is_dir():
            py_files.extend(
                [
                    p
                    for p in r.rglob("*.py")
                    if ".venv" not in p.parts and "node_modules" not in p.parts
                ]
            )

    all_errors = []
    for p in py_files:
        all_errors.extend(check_file(p))

    if all_errors:
        print("\n".join(all_errors))
        return 1
    print("OK: python limits")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
