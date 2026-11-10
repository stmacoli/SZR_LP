#!/usr/bin/env python3
"""Exporta um projeto web para revisão técnica, sem dependências e segredos conhecidos.

Uso: coloque este arquivo na raiz do projeto e execute `python exportar_studio.py`.
O ZIP é criado em uma pasta _exports_studio no diretório PAI do projeto.
"""
from __future__ import annotations

import json
import re
import sys
import zipfile
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent
OUT_DIR = ROOT.parent / "_exports_studio"
MAX_FILE_MB = 20
MAX_TOTAL_MB = 150
MAX_FILE = MAX_FILE_MB * 1024 * 1024
MAX_TOTAL = MAX_TOTAL_MB * 1024 * 1024

SKIP_DIRS = {
    ".git", "node_modules", ".next", ".nuxt", ".output", ".vercel", ".turbo",
    ".cache", ".parcel-cache", "dist", "build", "coverage", "tmp", "temp",
    "__pycache__", ".venv", "venv", ".idea", ".vscode-test", "playwright-report",
    "test-results", ".svelte-kit", ".astro", "_exports_studio", "uploads", "backups",
}
SKIP_SUFFIXES = {
    ".zip", ".7z", ".rar", ".tar", ".gz", ".log", ".db", ".sqlite", ".sqlite3",
    ".pem", ".key", ".p12", ".pfx", ".p8", ".crt", ".cer", ".jks",
    ".bak", ".backup", ".dump", ".sql.gz", ".pyc", ".map",
}
SKIP_NAMES = {
    ".env", ".npmrc", ".pypirc", ".netrc", "id_rsa", "id_ed25519",
    "credentials.json", "service-account.json", "service_account.json", "firebase-adminsdk.json",
    "secrets.json", "tokens.json", "token.json", "cookies.txt", ".DS_Store",
    "thumbs.db", "pnpm-debug.log", "npm-debug.log",
}
SECRET_NAME_PARTS = ("secret", "credential", "private-key", "private_key", "api-token", "access-token")
# Apenas padrões de alta confiança; NÃO é um detector completo de segredos.
SECRET_CONTENT = [
    re.compile(rb"-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----"),
    re.compile(rb"github_pat_[A-Za-z0-9_]{20,}"),
    re.compile(rb"gh[pousr]_[A-Za-z0-9]{30,}"),
    re.compile(rb"xox[baprs]-[A-Za-z0-9-]{15,}"),
    re.compile(rb"sk-proj-[A-Za-z0-9_-]{20,}"),
]
TEXT_SUFFIXES = {
    ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json", ".jsonc", ".md",
    ".txt", ".yaml", ".yml", ".toml", ".ini", ".py", ".css", ".scss",
    ".html", ".xml", ".sh", ".ps1", ".sql", ".graphql", ".gql", ".svg",
}


def reason_to_skip(relative: Path) -> str | None:
    if any(part.lower() in SKIP_DIRS for part in relative.parts[:-1]):
        return "pasta de dependências/cache/dados"
    name = relative.name.lower()
    if name.startswith(".env") or name.endswith(".local"):
        return "ambiente/configuração local"
    if name in SKIP_NAMES or any(part in name for part in SECRET_NAME_PARTS):
        return "nome potencialmente sensível"
    if name.endswith((".sqlite-wal", ".sqlite-shm", ".db-wal", ".db-shm")):
        return "banco de dados local"
    if any(name.endswith(s) for s in SKIP_SUFFIXES):
        return "arquivo gerado, banco ou credencial"
    return None


def main() -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    zip_path = OUT_DIR / f"studio-zileide-rocha-analise_{stamp}.zip"
    included: list[str] = []
    skipped: list[dict[str, str]] = []
    total = 0
    candidates: list[tuple[Path, Path, int]] = []

    for path in ROOT.rglob("*"):
        relative = path.relative_to(ROOT)
        why = reason_to_skip(relative)
        if why:
            if path.is_file():
                skipped.append({"file": relative.as_posix(), "reason": why})
            continue
        if path.is_symlink():
            skipped.append({"file": relative.as_posix(), "reason": "link simbólico"})
            continue
        if not path.is_file():
            continue
        try:
            size = path.stat().st_size
        except OSError:
            skipped.append({"file": relative.as_posix(), "reason": "arquivo inacessível"})
            continue
        if size > MAX_FILE:
            skipped.append({"file": relative.as_posix(), "reason": f"arquivo maior que {MAX_FILE_MB} MB"})
            continue
        if path.suffix.lower() in TEXT_SUFFIXES or path.name in {"Dockerfile", "Makefile", "Procfile"}:
            try:
                data = path.read_bytes()
                if any(pattern.search(data) for pattern in SECRET_CONTENT):
                    skipped.append({"file": relative.as_posix(), "reason": "possível chave/token no conteúdo"})
                    continue
            except OSError:
                skipped.append({"file": relative.as_posix(), "reason": "falha de leitura"})
                continue
        candidates.append((path, relative, size))

    candidates.sort(key=lambda item: item[1].as_posix())
    try:
        with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
            for path, relative, size in candidates:
                if total + size > MAX_TOTAL:
                    skipped.append({"file": relative.as_posix(), "reason": f"limite total de {MAX_TOTAL_MB} MB"})
                    continue
                try:
                    zf.write(path, arcname=relative.as_posix())
                except OSError:
                    skipped.append({"file": relative.as_posix(), "reason": "erro ao compactar"})
                    continue
                included.append(relative.as_posix())
                total += size
            report = {
                "created_at": datetime.now().isoformat(timespec="seconds"),
                "project_folder": ROOT.name,
                "files_included": len(included),
                "uncompressed_bytes": total,
                "included": included,
                "skipped": skipped,
                "note": "Revisar o ZIP antes de compartilhar: segredos escritos diretamente no código podem não ser detectados.",
            }
            zf.writestr("_RELATORIO_EXPORTACAO.json", json.dumps(report, indent=2, ensure_ascii=False))
    except Exception:
        zip_path.unlink(missing_ok=True)
        raise

    print(f"\nZIP criado: {zip_path}")
    print(f"Arquivos incluídos: {len(included)} | ignorados: {len(skipped)}")
    print(f"Tamanho do ZIP: {zip_path.stat().st_size / 1024 / 1024:.1f} MB")
    print("ATENÇÃO: confira o conteúdo antes de enviar. O filtro não garante remoção de todos os segredos.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
