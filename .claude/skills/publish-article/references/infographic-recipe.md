# LinkedIn Infographic Recipe

The primary social asset for a `/thoughts/` article is a **square black-and-white infographic**: informative, text-forward, and deliberately NOT the website's no-text minimalist image convention (that convention is for on-site imagery via `/create-image`; social assets teach at a glance). This recipe reproduces it for any article.

## Tool

Generate with `~/tools/imagine` (Gemini "Nano Banana Pro" = `gemini-3-pro-image`; renders text, labels, and data cleanly). It is the single entry point for AI image generation — never hand-roll a `google-genai` script. Generate **two candidates** and keep the more legible/balanced one.

```bash
imagine "<PROMPT>" --ratio 1:1 --size 2K -o {slug}-infographic.png
```

## Prompt template

Fill every `{...}`. This is the exact recipe that produced the working-memory infographic.

> Black-and-white square infographic poster, pure white background, clean editorial style with thin black line-art and bold sans-serif text. Title at top: {TITLE}. Subtitle under it: {ONE-LINE SUBTITLE}. Center: {ONE STRONG CENTRAL METAPHOR — the concept drawn as a familiar object}. Three concise labeled facts with thin leader lines arranged around it: {FACT 1}, {FACT 2}, {FACT 3} — each with a one-sentence explanation. Minimalist, high contrast, legible typography, generous spacing, black and white only, no other colors.

### Worked example — "Hold That Thought" (working memory)

- **TITLE:** WORKING MEMORY
- **SUBTITLE:** a cognitive vital you can track
- **CENTRAL METAPHOR:** a brain drawn as a computer RAM module, four slots filled and one empty
- **FACTS:** `Capacity about 4 items` · `Training will not grow it` · `Track your own baseline`

## Guidelines

- **One strong central metaphor.** Render the concept as a familiar object (working memory → RAM module). Find the equivalent for each article; the metaphor carries the image.
- **Exactly three labeled facts,** each a short label plus one accurate sentence. Keep text concise — the model renders text well, but shorter reads cleaner. Facts must be article-faithful; use the fact-checked numbers from the piece.
- **Pure black and white,** thin line-art, bold sans-serif, generous whitespace, square `1:1` at `2K`.
- **Two candidates, then cull.** Regenerate if any word garbles or a leader line points at the wrong element. (A bolder single-punchline "poster" variant is a fine alternate, but it once put the capacity arrow on the empty slot — the three-fact layout avoids that ambiguity.)
- **Pairing.** Publish under the LinkedIn caption from the main skill workflow. This infographic supersedes the earlier multi-slide carousel approach for social.

## Output

Save to `~/Desktop/{slug}-infographic.png` (plus a 1080px copy for the feed), alongside the promotion markdown.
