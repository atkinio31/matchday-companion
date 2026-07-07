import { travelOptions } from "../data/travel";
import type { Fixture } from "../data/fixtures";

interface Props {
  fixture: Fixture;
}

const timeFmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit" });

export default function TravelPlanner({ fixture }: Props) {
  const kickoff = new Date(fixture.kickoff);

  return (
    <section aria-label="Travel options">
      <h3 className="section-title">Getting to the ground</h3>
      <p className="section-intro">
        Kickoff {timeFmt.format(kickoff)}. Set-off times below are calculated from the
        suggested lead time for each way of travelling.
      </p>
      <div className="travel-grid">
        {travelOptions.map((t) => {
          const setOff = new Date(+kickoff - t.leadTimeMinutes * 60_000);
          return (
            <article key={t.id} className="travel-card">
              <header className="travel-head">
                <h4>{t.mode}</h4>
                <span className="travel-setoff">
                  set off by <strong>{timeFmt.format(setOff)}</strong>
                </span>
              </header>
              <p className="travel-headline">{t.headline}</p>
              <p className="travel-detail">{t.detail}</p>
              <p className="travel-goodfor">Good for: {t.goodFor}</p>
            </article>
          );
        })}
      </div>
      <p className="data-note">
        Illustrative guidance — always check official travel advice before a matchday.
      </p>
    </section>
  );
}
