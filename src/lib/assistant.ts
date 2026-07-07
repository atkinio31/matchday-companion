// Matchday assistant provider.
//
// Two modes:
//   1. MOCK (default): rule-based answers grounded in the travel knowledge base.
//      Works offline and with no API key — the app always demos cleanly.
//   2. GEMINI (your task — see ROADMAP.md): real generative answers via the
//      Gemini API, still grounded in the same knowledge base via the prompt.
//      Set VITE_GEMINI_API_KEY in .env.local to activate once implemented.
//
// Keeping one Assistant interface means the UI never cares which mode is live —
// the same pattern you'd use to swap Vertex AI in later.

import { travelOptions } from "../data/travel";
import type { Fixture } from "../data/fixtures";

export interface AssistantContext {
  fixture?: Fixture;
}

export interface Assistant {
  name: string;
  ask(question: string, ctx: AssistantContext): Promise<string>;
}

function knowledgeBaseText(): string {
  return travelOptions
    .map((t) => `${t.mode}: ${t.headline}. ${t.detail} Suggested lead time: ${t.leadTimeMinutes} minutes. Good for: ${t.goodFor}.`)
    .join("\n");
}

/** Rule-based fallback so the demo never depends on a network or a key. */
export const mockAssistant: Assistant = {
  name: "Matchday Assistant (offline mode)",
  async ask(question, ctx) {
    const q = question.toLowerCase();
    const fixtureLine = ctx.fixture
      ? `For ${ctx.fixture.opponent} (kickoff ${new Date(ctx.fixture.kickoff).toLocaleString("en-GB", { weekday: "long", hour: "2-digit", minute: "2-digit" })}): `
      : "";

    const match =
      travelOptions.find((t) => q.includes(t.mode.toLowerCase())) ??
      (q.includes("drive") || q.includes("parking")
        ? travelOptions.find((t) => t.id === "car")
        : undefined) ??
      (q.includes("kids") || q.includes("family") || q.includes("first")
        ? travelOptions.find((t) => t.id === "train")
        : undefined);

    if (match) {
      return `${fixtureLine}${match.headline}. ${match.detail} Aim to set off with about ${match.leadTimeMinutes} minutes in hand. (Offline mode — connect Gemini for tailored answers.)`;
    }

    return (
      `${fixtureLine}Here's the short version of getting to the Amex:\n\n` +
      travelOptions.map((t) => `• ${t.mode} — ${t.headline}`).join("\n") +
      `\n\nAsk about any of these by name. (Offline mode — connect Gemini for tailored answers.)`
    );
  },
};

const GEMINI_MODEL = "gemini-2.5-flash";

/**
 * Step 1 of 4: the raw Gemini call — no grounding, no error handling yet.
 * SAIL parallel: this is the integration object; the connected system is the
 * endpoint + key; the wrapper rule (grounding, fallback) comes in later steps.
 */
export async function askGeminiRaw(question: string, key: string): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: question }] }],
      }),
    },
  );
  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}

/**
 * YOUR TASK (ROADMAP item 1): implement the Gemini-backed assistant here.
 * Shape of the work:
 *   - read the key from import.meta.env.VITE_GEMINI_API_KEY
 *   - POST to the Gemini generateContent endpoint
 *   - system-style prompt: "Answer only from this knowledge base: ..." + knowledgeBaseText()
 *   - include the selected fixture from ctx for date/kickoff-aware answers
 *   - on any error, fall back to mockAssistant.ask(question, ctx)
 */
export function buildAssistant(): Assistant {
  const key = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  if (!key) return mockAssistant;
  // TODO(jonathan): return a Gemini-backed Assistant here.
  void knowledgeBaseText; // referenced so the helper is ready for your implementation
  return mockAssistant;
}
