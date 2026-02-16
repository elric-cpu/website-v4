from __future__ import annotations

import csv
import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path("feature_enhanced/public/images/album")
OUT_DIR = ROOT / "_analysis"
OUT_DIR.mkdir(parents=True, exist_ok=True)

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp"}


def compute_metrics(path: Path):
    try:
        with Image.open(path) as im:
            im = im.convert("RGB")
            w, h = im.size
            gray = np.array(im.convert("L"))
            edges = np.array(im.convert("L").filter(ImageFilter.FIND_EDGES))
            sharpness = float(edges.var())
            brightness = float(gray.mean())
            contrast = float(gray.std())
            aspect = w / h if h else 0
            long_side = max(w, h)
    except Exception:
        return None

    # Score heuristics: favor sharp, high-res, landscape-ish, mid brightness
    score = sharpness
    if long_side >= 3000:
        score *= 1.2
    if 1.2 <= aspect <= 2.2:
        score *= 1.2
    if 80 <= brightness <= 180:
        score *= 1.1

    return {
        "name": path.name,
        "size": path.stat().st_size,
        "width": w,
        "height": h,
        "aspect": round(aspect, 4),
        "long_side": long_side,
        "sharpness": round(sharpness, 2),
        "brightness": round(brightness, 2),
        "contrast": round(contrast, 2),
        "score": round(score, 2),
    }


def write_csv(rows, path: Path):
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=[
                "name",
                "size",
                "width",
                "height",
                "aspect",
                "long_side",
                "sharpness",
                "brightness",
                "contrast",
                "score",
            ],
        )
        writer.writeheader()
        for row in rows:
            writer.writerow(row)


def build_contact_sheets(rows, out_prefix: str, columns: int = 5, thumb_size=(360, 240)):
    font = ImageFont.load_default()
    padding = 12
    label_h = 20
    rows_sorted = rows[:]

    # chunk into pages
    per_page = columns * 6
    pages = math.ceil(len(rows_sorted) / per_page)
    for page in range(pages):
        chunk = rows_sorted[page * per_page : (page + 1) * per_page]
        if not chunk:
            continue
        rows_count = math.ceil(len(chunk) / columns)
        width = columns * (thumb_size[0] + padding) + padding
        height = rows_count * (thumb_size[1] + label_h + padding) + padding
        sheet = Image.new("RGB", (width, height), (18, 18, 18))
        draw = ImageDraw.Draw(sheet)

        for idx, item in enumerate(chunk):
            col = idx % columns
            row = idx // columns
            x = padding + col * (thumb_size[0] + padding)
            y = padding + row * (thumb_size[1] + label_h + padding)
            img_path = ROOT / item["name"]
            try:
                with Image.open(img_path) as im:
                    im = im.convert("RGB")
                    im.thumbnail(thumb_size)
                    thumb = Image.new("RGB", thumb_size, (30, 30, 30))
                    tx = (thumb_size[0] - im.size[0]) // 2
                    ty = (thumb_size[1] - im.size[1]) // 2
                    thumb.paste(im, (tx, ty))
            except Exception:
                thumb = Image.new("RGB", thumb_size, (60, 30, 30))

            sheet.paste(thumb, (x, y))
            label = item["name"]
            draw.text((x, y + thumb_size[1] + 2), label[:32], fill=(230, 230, 230), font=font)

        out_path = OUT_DIR / f"{out_prefix}_page_{page + 1}.png"
        sheet.save(out_path, "PNG")


def main():
    rows = []
    for path in sorted(ROOT.iterdir()):
        if path.suffix.lower() in IMAGE_EXTS:
            metrics = compute_metrics(path)
            if metrics:
                rows.append(metrics)

    rows.sort(key=lambda r: r["score"], reverse=True)
    write_csv(rows, OUT_DIR / "image_metrics.csv")

    landscape = [r for r in rows if r["aspect"] >= 1.2]
    portrait = [r for r in rows if r["aspect"] < 1.2]

    build_contact_sheets(landscape, "landscape")
    build_contact_sheets(portrait, "portrait")

    print(f"Wrote metrics: {OUT_DIR / 'image_metrics.csv'}")
    print(f"Contact sheets in: {OUT_DIR}")


if __name__ == "__main__":
    main()
