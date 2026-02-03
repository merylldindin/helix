---
name: review-seo
description: Audits the portfolio for SEO compliance including meta tags, Schema.org structured data, content optimization, and technical SEO. Validates both source files and the live deployed site.
allowed-tools: Read, Grep, Glob, Bash, WebFetch
---

# SEO Audit Skill

Validates SEO for Meryll Dindin's portfolio. See `references/seo-guidelines.md` for detailed guidelines.

## When to Use

- Reviewing meta tags (title, description, OG)
- Validating Schema.org structured data
- Checking content optimization (headings, keywords)
- Auditing technical SEO (robots.txt, sitemap)
- Preparing for deployment or launch

## Commands

Run from `.claude/skills/review-seo/`:

```bash
# Full audit (source files)
uv run python scripts/seo_audit.py --all

# Live site audit (deployed)
uv run python scripts/seo_audit.py --live

# Both source and live
uv run python scripts/seo_audit.py --all --live

# Individual validators
uv run python scripts/seo_audit.py --meta      # Meta tags
uv run python scripts/seo_audit.py --schema    # Schema.org
uv run python scripts/seo_audit.py --content   # Headings, keywords
uv run python scripts/seo_audit.py --technical # robots.txt, sitemap
```

## Key Files

| File                       | Purpose                       |
| -------------------------- | ----------------------------- |
| `src/content/pages/*.json` | Page meta tags (head.\*)      |
| `src/content/schemas/`     | Static Schema.org definitions |
| `src/utils/schemas/`       | Dynamic schema generators     |
| `nuxt.config.ts`           | Sitemap and SEO config        |

## Quick Reference

**Meta Tags:**

- Title: 50-60 chars, `{Page} | Meryll Dindin`
- Description: 120-160 chars
- Canonical: trailing slash (`/ventures/`)
- OG Image: 1200x630px

**Schema.org Types:**

- Person (primary identity)
- WebSite / WebPage
- BlogPosting (articles)
- BreadcrumbList (navigation)

See `references/seo-guidelines.md` for full guidelines.

## Workflow

1. Run `--all` to identify issues
2. Review reports in `scripts/output/`
3. Fix issues in `src/` files
4. Re-run specific validators to confirm
5. Run `--live` after deployment to verify
