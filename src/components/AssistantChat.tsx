import { useRef, useState } from "react";
import { buildAssistant } from "../lib/assistant";
import type { Fixture } from "../data/fixtures";

interface Props {
  fixture: Fixture;
}

interface Message {
  id: number;
  from: "fan" | "assistant";
  text: string;
}

const assistant = buildAssistant();

const starters = [
  "How do I get there by train?",
  "Coming with two kids, what's easiest?",
  "Can I drive and park nearby?",
];

export default function AssistantChat({ fixture }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      from: "assistant",
      text: "Ask me anything about getting to the match — trains, buses, parking, timings.",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const nextId = useRef(1);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    setDraft("");
    setMessages((m) => [...m, { id: nextId.current++, from: "fan", text: q }]);
    setBusy(true);
    const answer = await assistant.ask(q, { fixture });
    setMessages((m) => [...m, { id: nextId.current++, from: "assistant", text: answer }]);
    setBusy(false);
  };

  return (
    <section aria-label="Matchday assistant">
      <h3 className="section-title">{assistant.name}</h3>
      <div className="chat-log" aria-live="polite">
        {messages.map((m) => (
          <p key={m.id} className={m.from === "fan" ? "chat-msg from-fan" : "chat-msg from-assistant"}>
            {m.text}
          </p>
        ))}
        {busy && <p className="chat-msg from-assistant">Thinking…</p>}
      </div>
      <div className="chat-starters">
        {starters.map((s) => (
          <button key={s} onClick={() => send(s)} disabled={busy}>
            {s}
          </button>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(draft)}
          placeholder="Ask about your journey"
          aria-label="Ask the matchday assistant"
        />
        <button onClick={() => send(draft)} disabled={busy}>
          Ask
        </button>
      </div>
    </section>
  );
}
