# Editorial Guidelines

Rules for article voice, structure, and common pitfalls. Organized by workflow step.

## Drafting (Step 2)

### People Mentions

- **C-suite only by name.** Other team members go by role/title ("one of our clinical directors," "a clinical manager on our team").
- **Full name once** at introduction, first name only after that. Include role on first mention.

### Conversation References

- Establish the origin (Slack thread, meeting, etc.) once in the opening. Don't keep reminding the reader.
- After the intro, let dialogue carry itself. Vary naturally between "his correction was precise:" and "I pushed him on..." rather than repeating "in our thread."
- The conversation is context. The argument and evidence are the story.

## Fact-Checking (Step 3)

- Verify study attributions carefully: author lists, journal names, publication years. Papers by overlapping author groups are often misattributed across similar studies.
- For unverifiable exact numbers, soften rather than remove: "the vast majority" instead of a specific count, "policy reviews have found dozens" instead of an unverified figure.
- **Cross-verify with Gemini CLI** when available: pipe the draft through `gemini -p "fact-check this..."` as a second opinion. Gemini will sometimes flag legitimate issues but also confidently assert incorrect dates/journals — triangulate with dedicated fact-check agents, don't trust any single source.

## Writing Style (Steps 2-5)

- **Use "et al."** not "and colleagues" when citing researchers.
- **Avoid unexpanded acronyms.** Spell out on first use: RCT → randomized controlled trial, CRP → C-reactive protein, OMAD → one meal a day. Assume a smart non-specialist reader.
- **Add verbal hints for researchers.** Parenthetical context helps readers: "Steve Horvath (the godfather of epigenetic aging research)" or "Charles Brenner (the biochemist who discovered how NR feeds into NAD metabolism)." One line of context turns a name into a character.
- **Don't quote studies like giving a lecture.** Weave findings into the narrative. Keep statistics in references, not the body, unless they directly serve the argument.

## Humanizing (Step 4)

Highest-value fixes for article drafts beyond what `/humanize-text` catches by default:

1. **Contrastive pivots**: "It's not X — it's Y" is the biggest AI tell in argumentative writing. Max 1 per article.
2. **Em-dash density**: Under 3 per 500 words. Replace most with commas, periods, or restructured sentences.
3. **Scaffold sentences**: "Perhaps the most damaging finding:" — cut the announcement, lead with content.
4. **Contractions**: Always. "doesn't," "can't," "won't," "hasn't," "they're."
5. **Section headings**: Shorter and punchier. "Clinical Reasoning Is Not Guesswork" > "Clinical Reasoning Is Not the Absence of Rigor."

## Editorial Critique (Step 5)

- **Technology sections tend to be weakest** when the author works in the space. They risk reading like a pitch deck. Be concrete about specific tools/results or keep it short.
- **Don't restate arguments in the conclusion** as bullet-style principles. The article already made those points with evidence. End on the strongest closing thought.
- **Don't introduce new framings in the last 200 words** unless they get real space earlier. Either give the concept a full treatment or cut it.
- **Catalog lists slow pacing.** After making a point with one strong example, briefly mentioning others is enough — don't give each a full catalog.
