---
name: create-article
description: Creates polished blog articles for the /thoughts/ section from raw sources (PDFs, LinkedIn posts, screenshots). Handles drafting, fact-checking, humanizing, editorial review, images, and full site integration.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Agent, WebFetch, Skill
user-invocable: true
argument-hint: [topic or source description]
---

# Create Article

End-to-end workflow for publishing a new article to `/thoughts/`. References: `references/article-conventions.md` (JSON structure + unicode), `references/registration-checklist.md` (integration steps), `references/editorial-guidelines.md` (voice and pitfalls). Also see `.claude/rules/content-system.md` for general page conventions.

## When to Use

- User shares source material (PDFs, LinkedIn posts, screenshots, notes) and wants a new `/thoughts/` article
- Converting conference talks, presentations, or social media threads into long-form content

## Workflow

### 1. Gather Sources

Read all provided materials:
- PDFs via Read tool (use `pages` param for large files)
- LinkedIn posts via WebFetch
- Screenshots/images via Read tool (multimodal)
- Any other URLs via WebFetch

Extract key facts, arguments, quotes, data points, and references. If sources include Slack threads or internal conversations, read them via MCP Slack tools.

### 2. Draft Mock-up

Create a markdown draft at `/tmp/{slug}-article-mockup.md`.

Structure: opening hook, 5-7 sections building a coherent argument, closing that lands. Include a metadata block (title, description, canonical, keywords, date) and a sources section.

IMPORTANT: Title must fit on one line in the Cartesian font at headline-2 size. Keep under ~35 characters. Test visually if uncertain.

IMPORTANT: Description must be 120-160 characters per SEO rules in `.claude/rules/content-system.md`.

### 3. Fact-Check

Launch 3 parallel subagents to verify all claims:
- Statistics, percentages, dates
- Legal citations and case outcomes
- Named programs, organizations, tools
- Policy details and deadlines

Apply corrections. Soften unverifiable claims rather than removing them. See `references/editorial-guidelines.md` for additional tips.

### 4. Humanize

Run `/humanize-text` skill on the mock-up. This fixes:
- Structural tells (rhythm, scaffolding, paragraph shape)
- Tonal tells (hedging, false balance, flatness)
- Lexical tells (inflated verbs, generic adjectives)

### 5. Editorial Critique

Launch a subagent for editorial review covering:
- Argument structure and logical gaps
- Voice authenticity (strongest vs weakest sections)
- Audience clarity and register consistency
- Pacing, redundancy, opening/closing quality

Apply recommended revisions. Ask user before cutting entire sections. See `references/editorial-guidelines.md` for common editorial pitfalls (weak technology sections, conclusion restatements, late-introduced framings).

### 6. Create JSON, Register, and Update Listing

These three steps are independent — do them in parallel:

**Article JSON:** Create `src/content/pages/thoughts/{SCREAMING_SNAKE}.json` following `references/article-conventions.md`. Use placeholder image URLs.

**Register route:** Update 3 files per `references/registration-checklist.md` (routes.ts, index.ts barrel, routes mapping — all alphabetical).

**Update listing:** Add `IMAGE_SECTION` to `THOUGHTS_PAGE.json` per `references/article-conventions.md` (date-sorted, newest first). Use placeholder image URLs.

### 6b. Embed User-Provided Images

If the user provides screenshots or images to include in the article body:

1. Find the image file (check `~/Downloads/` for recent files matching the content)
2. Convert to WebP variants **without AI processing** — use `cwebp` directly:
   ```bash
   TIMESTAMP=$(date +%Y%m%dT%H%M%S)
   cwebp -q 85 "$SRC" -o "${NAME}.webp"
   cwebp -q 20 -resize 100 0 "$SRC" -o "${NAME}-lazy.webp"
   cwebp -q 80 -resize 768 0 "$SRC" -o "${NAME}-mobile.webp"
   cwebp -q 15 -resize 50 0 "$SRC" -o "${NAME}-mobile-lazy.webp"
   ```
3. Upload to S3: `aws s3 cp FILE s3://network-eu-west-3/CDN_PATH/NAME-TIMESTAMP.webp --content-type "image/webp"`
4. Add inline image block in the article JSON content array:
   ```json
   {
     "type": "image",
     "prop": {
       "altText": "Descriptive alt text",
       "source": "https://cdn.merylldindin.com/CDN_PATH/NAME-TIMESTAMP.webp",
       "lazySource": "...TIMESTAMP-lazy.webp",
       "mobile": "...TIMESTAMP-mobile.webp",
       "lazyMobile": "...TIMESTAMP-mobile-lazy.webp"
     }
   }
   ```

IMPORTANT: Do NOT use `--enhance` for user-provided images — that runs them through Gemini which alters the original. User images must be uploaded as-is, only converted to WebP.

### 6c. Render Mermaid Diagrams

If the article includes architectural or workflow diagrams:

1. Write each diagram as a `.mmd` file in `/tmp/mermaid-diagrams/`
2. Create the B&W theme config and puppeteer config (see `references/article-conventions.md` for exact JSON)
3. Render all diagrams: `npx @mermaid-js/mermaid-cli -i diagram.mmd -o diagram.png -w 1600 -b transparent -p puppeteer-config.json -c mermaid-config.json`
4. **Visually verify** each rendered PNG — check that layout is horizontal (LR) and not vertically stacked. If mermaid stacks nodes vertically, consolidate fan-in/fan-out nodes into grouped boxes.
5. Convert to WebP variants (same as Step 6b) and upload to `articles/sections/`
6. Add image blocks to the article JSON with `"darkModeTreatment": "invert-on-dark"`
7. **Redundancy check:** Review each diagram against surrounding text. Remove any diagram that merely restates what the prose already communicates. Keep only diagrams that show relationships or flow that text handles poorly.

### 7. Generate Images

Run `/create-image` skill 3 times **in parallel**:

| Image | Type | CDN Path Flag | Prompt Focus |
|-------|------|---------------|-------------|
| Thumbnail | `thumbnail` | (default) | Single centered concept, 16:9 |
| Header | `background` | `--cdn-path "articles/headers"` | Wide horizontal composition |
| Poster | `section` | `--cdn-path "articles/posters"` | Square, used on listing page |

Update all placeholder URLs in both JSON files with returned CDN URLs. Update `altText` to describe the actual generated image.

### 8. Verify

Run in parallel:

```bash
yarn types       # Must pass
yarn eslint:fix  # Fix any issues
```

### 9. Get User Approval

Ask the user to review the final article on their local dev server (do NOT start the server — the user manages it).

## Dependent Skills

- `/humanize-text` — editorial pass on draft (Step 4)
- `/create-image` — image generation and CDN upload (Step 7)
