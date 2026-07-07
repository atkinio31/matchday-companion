# Roadmap — your tasks, in interview-value order

Work through these in Claude Code. Each one is small, and each one is something
you should expect to be asked about.

## 1. Gemini-powered assistant (the headline feature)
Implement the Gemini provider in `src/lib/assistant.ts` (the TODO marks the spot).
- Read the key from `import.meta.env.VITE_GEMINI_API_KEY`
- Ground the prompt in `knowledgeBaseText()` and the selected fixture
- Fall back to the mock on any error, so the demo never breaks live
- Interview angle: why grounding matters, why you kept a fallback, and the
  trade-off of a browser-exposed key (and how a Cloud Function proxy fixes it —
  which is literally their stack)

## 2. Deploy to Cloud Run
Follow the README. Do it from your own Google account so the URL is yours.
- Interview angle: what the Dockerfile stages do, why nginx listens on 8080,
  what `gcloud run deploy --source` does behind the scenes (Cloud Build,
  Artifact Registry — both named in the job description)

## 3. The journey map (the differentiator)
Produce a one-page "first visit to the Amex" user journey map: stages from
"decides to go" to "home again", with touchpoints, feelings, and pain points —
then annotate where this app intervenes. PDF or a simple page in the app.
- Interview angle: this is the JD's own language ("journey maps, visual
  mock-ups and prototypes") made real

## 4. Responsive polish pass
Test at 360px and 1280px. Fix anything cramped. Add one thing you noticed
yourself — that story ("I tested on my phone and found…") is interview gold.

## 5. Stretch, only if time allows
- Live weather for the selected fixture via Open-Meteo (no key needed)
- Checklist persistence with localStorage
- A second journey: evening kickoff vs Saturday 3pm differences
