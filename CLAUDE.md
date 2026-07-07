# Matchday Companion — project brief for Claude Code

Unofficial fan-made demo built for a Junior Cloud Developer (Front End) application
at Brighton & Hove Albion. Owner: Jonathan Atkins, learning React/TypeScript from an
Appian SAIL / low-code background.

## Purpose
Demonstrate: React + TypeScript, responsive design (mobile-first), user journey
thinking, an AI-assisted feature, and deployment to Google Cloud Run.

## Conventions
- British English in all copy.
- No club crest, player imagery, or Premier League marks. Team names as plain text
  only. Keep the "unofficial demo" footer intact.
- All fixture/travel content is clearly-labelled sample data; keep those labels.
- Plain CSS with custom properties in src/styles.css (tokens at the top). No CSS
  frameworks.
- Explain changes in terms of SAIL parallels where helpful (props ≈ rule inputs,
  useState ≈ local variables, handlers ≈ saveInto) — the owner learns fastest
  through that mapping.

## Architecture
- src/data/ — static knowledge base (fixtures, travel options, checklist template)
- src/lib/assistant.ts — Assistant interface; mock provider implemented, Gemini
  provider is the owner's task (see ROADMAP.md)
- src/components/ — one component per tab + CountdownBoard (the signature element)
- App.tsx — tab shell and shared fixture state

## Working agreement
Work in small steps the owner can follow and question. Prefer explaining a change
before making it. The owner must be able to defend every line at interview.
