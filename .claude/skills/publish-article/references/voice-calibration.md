# Voice Calibration

LinkedIn posts should match Meryll's established voice. These are real published posts that performed well. Study the patterns, don't copy the structure.

## What works

- **Lead with what you built**, not with a thesis or a question. The reader should know within two sentences what this is about.
- **Specific numbers and details.** "40 tool calls on a question that needed two." "122,000 patients." "VO2 max sits at the top." Concrete beats abstract every time.
- **Short paragraphs.** Most are 2-3 sentences. Some are one sentence. None are more than five.
- **No bullets, no numbered lists.** Prose only. The conversational rhythm matters.
- **One "I didn't expect this" or "one thing surprised me" pivot.** Readers remember the surprise.
- **Personal experience as evidence.** "I watched it burn through 40 calls." "I built my own testing stack." Not "studies show" or "experts agree."
- **End with the link, then hashtags.** No call-to-action fluff ("What do you think?" "Share your experience!").
- **Contractions always.** "Didn't," "isn't," "won't," "doesn't."
- **No em-dashes.** Use commas, periods, or parentheses.

## What doesn't work

- Opening with a question ("Ever wondered how...?")
- Opening with a grand claim ("In today's AI landscape...")
- Bullet-point summaries of the article
- Explaining what you're about to explain ("In this post, I'll cover...")
- Hedging ("it could be argued," "one might say")
- Closing with a question to drive engagement ("What's your take?")
- Mentioning LinkedIn or the platform itself

## Example: Technical Article (Voltaire / Company Brain)

We built an internal AI agent that connects our data warehouse, 250,000+ documents, support tickets, and codebase into a single Slack interface. Any employee asks a question, gets a sourced answer in seconds.

The agent took two and a half weeks to build. The data infrastructure underneath it took two years.

That ratio is the whole lesson. ETL pipelines feeding BigQuery from every operational system we run. dbt Labs transformations with column-level descriptions for every table. An LLM querying an undocumented warehouse generates confident SQL that returns wrong numbers. We know because we tested it before documenting anything.

Trust turned out to be a one-shot problem. If the agent gives a bad answer three times, nobody comes back. So every response ships with sources. SQL queries are visible. Document citations link to Drive. The biggest AI skeptic in the company started using it after a shadow session, and within weeks she was presenting what she'd automated to the whole team.

One thing surprised me: routing matters more than model selection. A lightweight planner decides which agents to activate before the orchestrator runs. Send a revenue question to the codebase agent instead of the BigQuery agent, and the response is useless regardless of how good the model is.

If I were starting over, I wouldn't build the agent first. I'd build the data layer. Get systems feeding into a warehouse, document schemas, start transcribing meetings. Every month of centralized data you collect now is context you can't backfill later. The chatbot wrapper with no grounded data underneath it is the most common version of this I see, and it's the one that burns the trust you need for the version that actually works.

Full writeup: https://lnkd.in/eYMEX66m

#AI #DataEngineering #AgenticAI #KnowledgeManagement

## Example: Health/Science Article (Body of Evidence / Biomarkers)

My last annual physical was six years ago. Everything was "within normal range." I haven't been back since.

Normal range means you fall between the 2.5th and 97.5th percentile of a reference population that includes people with undiagnosed conditions and metabolic dysfunction. Being normal in a sick population isn't reassuring. It's the floor.

So I built my own testing stack. Four platforms, roughly quarterly. Over 100 biomarkers per cycle. Four years of data now.

I rank every marker by one question: how strongly does the evidence link it to dying or not dying? Mortality prediction first, disease risk second, protocol feedback third, curiosity last. VO2 max sits at the top. A 2018 study of 122,000 patients found cardiorespiratory fitness was the single strongest predictor of survival, stronger than smoking, diabetes, or coronary disease. If that number drops, I restructure everything. Grip strength is second. A Lancet study of 140,000 adults found it predicted cardiovascular death more reliably than blood pressure. Ten seconds with a hand dynamometer. Cheap and almost nobody tests it.

Context beats isolated readings. My LDL at 132 would get me a statin conversation with most physicians. But ApoB at 88, LDL Pattern A, triglyceride-to-HDL at 0.85, hs-CRP at 0.4, fasting insulin at 4.7. The full picture doesn't support the same intervention that one number might.

If you could only pick one test, make it the annual VO2 max. Strongest mortality predictor, roughly $150. Second: a broad blood panel with metabolic and inflammatory markers. The standard annual physical checks almost none of the markers that actually predict what kills people. It was designed to catch disease after the fact, not to tell you where you stand.

Full writeup: https://merylldindin.com/thoughts/body-of-evidence/

#Biomarkers #Longevity #PreventiveHealth #HealthTracking #VO2Max

## Hashtag Conventions

- 4-6 hashtags per post
- Mix broad reach (#AI) with specific (#PydanticAI)
- Match hashtags to the article's actual topic, not aspirational reach
- No hashtag symbol in the body text, only at the end
