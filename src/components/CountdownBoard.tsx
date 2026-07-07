import { useEffect, useState } from "react";
import type { Fixture } from "../data/fixtures";

interface Props {
  fixture: Fixture;
}

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  past: boolean;
}

function remainingUntil(iso: string): Remaining {
  const diff = +new Date(iso) - Date.now();
  const past = diff <= 0;
  const t = Math.max(0, diff) / 1000;
  return {
    days: Math.floor(t / 86400),
    hours: Math.floor((t % 86400) / 3600),
    minutes: Math.floor((t % 3600) / 60),
    seconds: Math.floor(t % 60),
    past,
  };
}

function Cell({ value, label }: { value: number; label: string }) {
  return (
    <div className="board-cell">
      <span className="board-digits">{String(value).padStart(2, "0")}</span>
      <span className="board-label">{label}</span>
    </div>
  );
}

/** Kickoff countdown styled as a rail departure board — the app's signature. */
export default function CountdownBoard({ fixture }: Props) {
  const [rem, setRem] = useState<Remaining>(() => remainingUntil(fixture.kickoff));

  useEffect(() => {
    const id = setInterval(() => setRem(remainingUntil(fixture.kickoff)), 1000);
    return () => clearInterval(id);
  }, [fixture.kickoff]);

  return (
    <div className="board" role="timer" aria-label="Time until kickoff">
      <div className="board-header">
        <span>Departing for</span>
        <strong>{fixture.venue}</strong>
      </div>
      {rem.past ? (
        <div className="board-live">KICKED OFF</div>
      ) : (
        <div className="board-row">
          <Cell value={rem.days} label="days" />
          <Cell value={rem.hours} label="hrs" />
          <Cell value={rem.minutes} label="min" />
          <Cell value={rem.seconds} label="sec" />
        </div>
      )}
    </div>
  );
}
