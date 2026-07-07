import { useState } from "react";
import { fixtures, nextHomeFixture } from "./data/fixtures";
import type { Fixture } from "./data/fixtures";
import FixturePlanner from "./components/FixturePlanner";
import TravelPlanner from "./components/TravelPlanner";
import Checklist from "./components/Checklist";
import AssistantChat from "./components/AssistantChat";

type Tab = "fixture" | "travel" | "checklist" | "assistant";

const tabs: { id: Tab; label: string }[] = [
  { id: "fixture", label: "Fixture" },
  { id: "travel", label: "Travel" },
  { id: "checklist", label: "Checklist" },
  { id: "assistant", label: "Assistant" },
];

export default function App() {
  const [selected, setSelected] = useState<Fixture>(() => nextHomeFixture() ?? fixtures[0]);
  const [tab, setTab] = useState<Tab>("fixture");

  return (
    <div className="app">
      <header className="masthead">
        <h1>Matchday Companion</h1>
        <p className="masthead-sub">Plan your journey to the Amex</p>
      </header>

      <main className="content">
        {tab === "fixture" && (
          <FixturePlanner fixtures={fixtures} selected={selected} onSelect={setSelected} />
        )}
        {tab === "travel" && <TravelPlanner fixture={selected} />}
        {tab === "checklist" && <Checklist />}
        {tab === "assistant" && <AssistantChat fixture={selected} />}
      </main>

      <nav className="tabbar" aria-label="Sections">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={t.id === tab ? "tab is-active" : "tab"}
            onClick={() => setTab(t.id)}
            aria-current={t.id === tab ? "page" : undefined}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <footer className="footer">
        Unofficial fan-made demo for a job application. Not affiliated with Brighton &amp; Hove
        Albion FC. Sample data throughout.
      </footer>
    </div>
  );
}
