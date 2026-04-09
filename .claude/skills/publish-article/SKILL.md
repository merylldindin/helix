---
name: publish-article
description: Generates LinkedIn post and Hacker News submission for a /thoughts/ article. Use after an article is finalized and ready to promote.
argument-hint: '<article-slug>'
user-invocable: true
---

# Publish Article

Generates promotion materials for a published `/thoughts/` article: a LinkedIn post and a Hacker News title/URL/description. Outputs to `~/Desktop/{slug}-promotion.md`.

## When to Use

- After `/create-article` is complete and the article is ready to share
- When the user wants to promote an existing article

## Workflow

### 1. Read the Article

Read `src/content/pages/thoughts/{SCREAMING_SNAKE}.json` to extract:
- The full article text (all `type: "text"` props)
- Title, description, canonical URL
- Keywords and publication date

If the user provides a slug (e.g., `reasoning-loop`), map it to the JSON file. If ambiguous, check `src/types/routes.ts` for the mapping.

### 2. Read Prior Articles (if any)

Check if this article cross-references other published articles. Read those too for context on what's already been shared publicly.

### 3. Draft LinkedIn Post

Write a LinkedIn post following the voice guidelines in `references/voice-calibration.md`.

**Structure:**
- Hook: 1-2 sentences that make someone stop scrolling. Lead with what you built or discovered, not with a question or a grand claim.
- Body: 4-6 short paragraphs. Each paragraph makes one point with specific evidence. No bullets. No numbered lists.
- Close: Link to the article. Hashtags on a separate line.

**Length:** 200-350 words. LinkedIn truncates at ~210 words behind "see more," so front-load the best content.

**IMPORTANT:** If this article is part of a series (check `.claude/plans/` for series context), reference the previous article naturally in the opening ("I wrote recently about X. This is the part I skipped."). Don't mention the series itself.

### 4. Draft Hacker News Submission

**Title:** Write like you're telling a colleague what you wrote. Use lowercase. Include the stack in parentheses if it's specific enough to attract the right audience. Under 80 characters.

Examples of good HN titles:
- "How we orchestrate our internal AI agent (PydanticAI, Gemini, Jinja2 prompts)"
- "Building a knowledge graph from 250K Google Drive files with SQLite and FTS5"

Examples of bad HN titles:
- "The Reasoning Loop: Anatomy of a Production AI Orchestrator" (too bloggy)
- "How AI Is Transforming Internal Knowledge Management" (too generic)

**URL:** `https://merylldindin.com{canonical}`

**Description:** Write like you're posting in the comments of your own submission. Hacker-to-hacker. Specific stack names, actual numbers, implementation details that engineers care about. End with "Happy to answer questions about the architecture" or similar invitation. 3-5 sentences.

### 5. Humanize

Run `/humanize-text` on the LinkedIn post section only (not the HN section, which should already be casual).

### 6. Output

Write the final file to `~/Desktop/{slug}-promotion.md` with this structure:

```markdown
# Promote: {Article Title}

## LinkedIn Post

{post text}

{hashtags}

---

## Hacker News

**Title:** {title}

**URL:** {url}

**Description (for comments):**

{description}
```

## Dependent Skills

- `/humanize-text` for LinkedIn post editorial pass (Step 5)
