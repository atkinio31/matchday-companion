import type { Fixture } from "../data/fixtures";
import CountdownBoard from "./CountdownBoard";

interface Props {
  fixtures: Fixture[];
  selected: Fixture;
  onSelect: (f: Fixture) => void;
}

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

export default function FixturePlanner({ fixtures, selected, onSelect }: Props) {
  return (
    <section aria-label="Fixture">
      <div className="ticket">
        <div className="ticket-eyebrow">{selected.competition}</div>
        <h2 className="ticket-match">
          {selected.home ? (
            <>Brighton &amp; Hove Albion <span className="vs">v</span> {selected.opponent}</>
          ) : (
            <>{selected.opponent} <span className="vs">v</span> Brighton &amp; Hove Albion</>
          )}
        </h2>
        <div className="ticket-meta">
          {dateFmt.format(new Date(selected.kickoff))} · {selected.venue}
        </div>
        <CountdownBoard fixture={selected} />
      </div>

      <h3 className="section-title">Choose a fixture</h3>
      <ul className="fixture-list">
        {fixtures.map((f) => (
          <li key={f.id}>
            <button
              className={f.id === selected.id ? "fixture-item is-selected" : "fixture-item"}
              onClick={() => onSelect(f)}
            >
              <span className="fixture-opp">
                {f.home ? "H" : "A"} · {f.opponent}
              </span>
              <span className="fixture-date">{dateFmt.format(new Date(f.kickoff))}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="data-note">Sample fixtures for demonstration — not the real schedule.</p>
    </section>
  );
}
