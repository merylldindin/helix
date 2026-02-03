# Claude Code Best Practices

Comprehensive guide for authoring skills, rules, and CLAUDE.md files.

## Skills Best Practices

### Description Guidelines

The description field is injected into Claude's system prompt. It determines when the skill activates.

**Third person always**:

```yaml
# Good
description: Generates images following the portfolio visual identity.

# Bad
description: I help you generate images for your portfolio.
```

**Include what + when**:

```yaml
# Good
description: Audits SEO compliance. Use before deployment or when checking search visibility.

# Bad
description: SEO tool for the website.
```

**Key terms for discovery**:

```yaml
# Good - includes terms users might say
description: Creates pull requests with summary and test plan. Use after completing a feature or fix.

# Bad - too generic
description: Helps with PRs.
```

### Instruction Quality

Skills are prompts executed by Claude. Apply prompt engineering principles:

**Be specific, not vague**:

```markdown
# Bad
"review the code"

# Good
"check for unused exports, missing alt text, and console.log statements in production code"
```

**State explicit constraints**:

- What NOT to do: "don't modify files outside src/"
- What to reference: "follow patterns in visual-identity.md"
- Expected output: "return JSON with CDN URLs for all variants"

**Use emphasis for critical rules**:

```markdown
IMPORTANT: Always include --name flag when uploading to CDN.

YOU MUST verify the image is black and white before uploading.
```

**Provide input/output examples** for output-sensitive skills:

```markdown
**Input**: "abstract representation of machine learning"
**Output**:
{
  "source": "https://cdn.merylldindin.com/assets/ml-20260202.webp",
  "lazySource": "https://cdn.merylldindin.com/assets/ml-20260202-lazy.webp"
}
```

### Content Structure

**Progressive disclosure**:

- SKILL.md: Essential workflow (< 200 lines)
- references/: Detailed guidelines, examples, edge cases

**Checklists for complex tasks**:

```markdown
Copy this checklist and track progress:

- [ ] Read visual-identity.md guidelines
- [ ] Generate image with appropriate prompt
- [ ] Verify monochrome output
- [ ] Upload to CDN with --name flag
- [ ] Update content JSON with URLs
```

**Degrees of freedom**:

- High freedom (guidelines): Creative tasks, reviews
- Medium freedom (templates): Report generation
- Low freedom (exact commands): Deployments, migrations

### File Organization

```
.claude/skills/<skill-name>/
├── SKILL.md              # Main instructions (required)
├── references/           # Supporting documentation
│   ├── guidelines.md     # Detailed rules
│   └── examples.md       # Usage examples
└── scripts/              # Utility scripts
    └── main.py
```

**One level deep**: References should link directly from SKILL.md, not chain to other files.

### Frontmatter Fields

| Field            | Required | Purpose                  |
| ---------------- | -------- | ------------------------ |
| `name`           | Yes      | Skill identifier         |
| `description`    | Yes      | System prompt injection  |
| `allowed-tools`  | No       | Restrict available tools |
| `argument-hint`  | No       | Autocomplete suggestion  |
| `user-invocable` | No       | Enable `/skill` command  |
| `context`        | No       | `fork` for subagent      |

---

## Rules Best Practices

Rules in `.claude/rules/` are auto-loaded into context. Keep them focused and actionable.

### Structure

**One topic per file**:

```
.claude/rules/
├── vue-components.md    # Only Vue component conventions
├── typescript.md        # Only TypeScript standards
├── styling.md           # Only SCSS/CSS patterns
└── git-workflow.md      # Only git conventions
```

**Under 50 lines each**: If a rule file grows beyond 50 lines, split it or move details to skill references.

### Content Guidelines

**Actionable, not explanatory**:

```markdown
# Good
- Use `defineProps` with TypeScript interface
- Boolean props: prefix with `is` or `has`

# Bad
- Vue 3 introduced the Composition API which allows for better TypeScript integration...
```

**Only what Claude can't infer**:

- Project-specific patterns (cProps naming)
- Non-obvious conventions (Name That Color)
- Critical constraints (no `any` types)

**Skip common knowledge**:

- Standard TypeScript syntax
- Basic Vue patterns
- Common ESLint rules (Claude knows these)

### Naming Rules Files

Use descriptive, topic-focused names:

- `vue-components.md` (not `components.md`)
- `typescript.md` (not `code-style.md`)
- `content-system.md` (not `json.md`)

---

## CLAUDE.md Best Practices

CLAUDE.md is the primary memory file. Keep it concise and essential.

### Structure

```markdown
# Project Name

One-line description.

## Commands
Essential commands only.

## Code Conventions
Link to .claude/rules/ for details.

## Skills
Table of user-invocable skills.

## Key Patterns
Project-specific patterns Claude needs.
```

### Content to Include

- **Essential commands**: Build, test, deploy
- **Skills table**: Name, command, one-line purpose
- **Key patterns**: Project-specific (content system, routing)
- **Critical constraints**: Things that MUST be done a certain way

### Content to Exclude

- **File structure**: Claude can `ls`
- **Standard conventions**: Claude knows common patterns
- **Verbose explanations**: Trust Claude's intelligence
- **Duplicate information**: Link to rules/skills instead

### Size Guidelines

- Target: Under 100 lines
- Maximum: 200 lines
- If longer: Move content to `.claude/rules/` or skill references

### Tuning Tips

**Iterate based on behavior**:

- If Claude ignores a rule, add `IMPORTANT:`
- If Claude asks about something, add it
- If Claude does something wrong, add constraint

**Tables over prose**:

```markdown
# Good
| Command | Purpose |
|---------|---------|
| `make start` | Dev server |

# Bad
To start the development server, run `make start`. This will launch...
```

---

## Anti-Patterns

### Skills

- First-person descriptions ("I help you...")
- SKILL.md over 200 lines
- Vague descriptions ("Helps with stuff")
- Missing emphasis on critical rules
- Chained references (A → B → C)

### Rules

- Rules over 50 lines
- Explanations instead of guidelines
- Duplicate content across files
- Standard knowledge Claude has

### CLAUDE.md

- Over 200 lines
- Full file structure listings
- Verbose command explanations
- Duplicate of rules content

---

## Audit Checklist

### Per Skill

- [ ] Description: third person
- [ ] Description: includes what + when
- [ ] Description: under 200 characters
- [ ] SKILL.md: under 200 lines
- [ ] References: in references/ subdirectory
- [ ] Critical rules: marked IMPORTANT
- [ ] Output-sensitive: has examples

### Per Rule

- [ ] Single topic focus
- [ ] Under 50 lines
- [ ] Actionable guidelines
- [ ] No standard knowledge
- [ ] No overlap with other rules

### CLAUDE.md

- [ ] Under 100 lines (ideal) / 200 (max)
- [ ] All user-invocable skills listed
- [ ] Links to rules (not duplicates)
- [ ] Essential commands only
- [ ] No verbose explanations
