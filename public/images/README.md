# images/

Generated image system for Home Storage Guide. See `docs/IMAGE-SYSTEM.md`.

- `manifest.json` — single source of truth (committed). Regenerate with `npm run images:manifest`.
- `prompts/` — per-page prompt text files + `prompts.csv` for the image team.
- `source/` — drop generated photo masters here (e.g. `source/shelf-life/pantry/how-long-does-rice-last/hero.jpg`, `>=1600x900`). Git-ignored.
- `optimized/` — AVIF/WebP/JPEG breakpoints produced by `npm run images:optimize`. Git-ignored.
- `pins/` — 1000x1500 Pinterest crops. Git-ignored.
- `og/` — 1200x630 social crops. Git-ignored.

Pipeline: `npm run images:manifest` → drop masters into `source/` → `npm run images:optimize` → article hero/support slots render automatically.
