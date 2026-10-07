#!/usr/bin/env python3
"""Render every route PDF page to JPEG and build Hugo's preview manifest."""

import json
from pathlib import Path
import shutil
import subprocess
import tempfile


ROOT = Path(__file__).resolve().parent.parent
STATIC = ROOT / "static"


def main():
    if not shutil.which("pdftoppm"):
        raise SystemExit("pdftoppm is required; install poppler-utils first.")

    manifest = {}
    total_pages = 0
    total_bytes = 0
    pdfs = sorted((STATIC / "padesatka").rglob("*.pdf"))
    for pdf in pdfs:
        # Stage complete output before replacing previews; a failed PDF aborts
        # deployment and never changes the source document.
        with tempfile.TemporaryDirectory(prefix="route-preview-") as directory:
            prefix = Path(directory) / "page"
            subprocess.run(
                ["pdftoppm", "-jpeg", "-jpegopt", "quality=85",
                 "-scale-to", "1600", str(pdf), str(prefix)],
                check=True,
            )
            pages = sorted(
                Path(directory).glob("page-*.jpg"),
                key=lambda page: int(page.stem.rsplit("-", 1)[1]),
            )
            if not pages:
                raise RuntimeError(f"PDF produced no preview pages: {pdf}")
            destination = pdf.parent / "previews"
            destination.mkdir(exist_ok=True)
            images = []
            for number, page in enumerate(pages, start=1):
                output = destination / f"{pdf.stem}-{number}.jpg"
                shutil.copyfile(page, output)
                images.append("/" + output.relative_to(STATIC).as_posix())
                total_bytes += output.stat().st_size
            manifest["/" + pdf.relative_to(STATIC).as_posix()] = images
            total_pages += len(images)
            print(f"{pdf.relative_to(STATIC)}: {len(images)} pages")

    manifest_path = ROOT / "data" / "route_previews.json"
    manifest_path.parent.mkdir(exist_ok=True)
    manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Rendered {total_pages} pages from {len(pdfs)} PDFs "
          f"({total_bytes / 1024 / 1024:.2f} MiB).")


if __name__ == "__main__":
    main()
