import { useState } from "react";
import { checklistTemplate } from "../data/travel";

interface Item {
  id: number;
  text: string;
  done: boolean;
}

export default function Checklist() {
  const [items, setItems] = useState<Item[]>(() =>
    checklistTemplate.map((text, i) => ({ id: i, text, done: false }))
  );
  const [draft, setDraft] = useState("");

  const toggle = (id: number) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it)));

  const add = () => {
    const text = draft.trim();
    if (!text) return;
    setItems((prev) => [...prev, { id: Date.now(), text, done: false }]);
    setDraft("");
  };

  const doneCount = items.filter((i) => i.done).length;

  return (
    <section aria-label="Matchday checklist">
      <h3 className="section-title">Matchday checklist</h3>
      <p className="section-intro">
        {doneCount} of {items.length} sorted
      </p>
      <ul className="check-list">
        {items.map((it) => (
          <li key={it.id}>
            <label className={it.done ? "check-item is-done" : "check-item"}>
              <input type="checkbox" checked={it.done} onChange={() => toggle(it.id)} />
              <span>{it.text}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="check-add">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Add your own item"
          aria-label="New checklist item"
        />
        <button onClick={add}>Add item</button>
      </div>
    </section>
  );
}
