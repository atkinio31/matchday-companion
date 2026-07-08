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

const GEMINI_INSTRUCTION =
  "You are a matchday travel assistant for fans visiting the American Express Stadium. " +
  "Answer only from the knowledge base below. If the answer is not in it, say so rather " +
  "than guessing. Keep answers short and practical.";

// The model can't see the app's state — everything it should use (facts, the
// selected fixture) has to be serialised into this one string.
function buildPrompt(question: string, ctx: AssistantContext): string {
  const fixtureText = ctx.fixture
    ? `Selected fixture: ${ctx.fixture.opponent} (${ctx.fixture.home ? "home" : "away"}, ${ctx.fixture.competition}), kickoff ${new Date(ctx.fixture.kickoff).toLocaleString("en-GB", { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}.`
    : "No fixture selected.";

  return [
    GEMINI_INSTRUCTION,
    `Knowledge base:\n${knowledgeBaseText()}`,
    fixtureText,
    `Fan's question: ${question}`,
  ].join("\n\n");
}

/**
 * Grounded Gemini call. Throws on ANY failure — network error, non-OK HTTP
 * status, or a 200 with no usable text (e.g. a SAFETY-blocked candidate) —
 * so the caller has a single error channel to catch and fall back on.
 */
export async function askGemini(question: string, ctx: AssistantContext, key: string): Promise<string> {
  const prompt = buildPrompt(question, ctx);
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    },
  );
  if (!res.ok) {
    throw new Error(`Gemini responded ${res.status}`);
  }
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof text !== "string" || text.length === 0) {
    throw new Error("Gemini returned no usable text");
  }
  return text;
}

export function buildAssistant(): Assistant {
  const key = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  if (!key) return mockAssistant;
  return {
    name: "Matchday Assistant (Gemini)",
    async ask(question, ctx) {
      try {
        return await askGemini(question, ctx, key);
      } catch (err) {
        console.warn("Gemini unavailable, using offline answer:", err);
        return mockAssistant.ask(question, ctx);
      }
    },
  };
}
