# Matchday Companion

An unofficial, fan-made demo app for planning a trip to the American Express
Stadium: pick a fixture, see a kickoff countdown, compare ways of travelling with
calculated set-off times, tick off a matchday checklist, and ask a matchday
assistant free-text questions.

Built as a learning project in React + TypeScript by a developer from a low-code
(Appian) background, using AI-assisted development. **Not affiliated with Brighton
& Hove Albion FC.** All fixture and travel content is sample data.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
```

## Build and preview production
```bash
npm run build
npm run preview
```

## Deploy to Google Cloud Run
Prerequisites: a Google Cloud project with billing enabled (free tier covers this),
and the gcloud CLI authenticated (`gcloud auth login`).

```bash
gcloud config set project YOUR_PROJECT_ID
gcloud run deploy matchday-companion \
  --source . \
  --region europe-west2 \
  --allow-unauthenticated
```

`--source .` uses Cloud Build with the included Dockerfile (build stage compiles the
app, nginx serves the static bundle on port 8080, which Cloud Run expects). The
command prints the public URL when it finishes.

## AI assistant
The assistant ships in offline mock mode so the demo always works without keys or
network. To enable real generative answers, complete ROADMAP item 1 (Gemini
integration) and set `VITE_GEMINI_API_KEY` in `.env.local` (see `.env.example`,
including the note on client-side key exposure).

## Structure
- `src/data/` — sample fixtures and the travel knowledge base
- `src/lib/assistant.ts` — pluggable assistant (mock now, Gemini slot ready)
- `src/components/` — Fixture planner, countdown board, travel, checklist, chat
- `src/styles.css` — design tokens and all styling
