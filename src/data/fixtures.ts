// SAMPLE DATA — illustrative fixtures only, not the real 2026/27 schedule.
// Replace with real fixtures (or an API feed) before demoing dates as facts.

export interface Fixture {
  id: string;
  opponent: string;
  home: boolean;
  competition: string;
  kickoff: string; // ISO 8601
  venue: string;
}

export const fixtures: Fixture[] = [
  {
    id: "f1",
    opponent: "Sample Opponent A",
    home: true,
    competition: "Premier League (sample)",
    kickoff: "2026-08-15T15:00:00+01:00",
    venue: "American Express Stadium",
  },
  {
    id: "f2",
    opponent: "Sample Opponent B",
    home: false,
    competition: "Premier League (sample)",
    kickoff: "2026-08-22T17:30:00+01:00",
    venue: "Away",
  },
  {
    id: "f3",
    opponent: "Sample Opponent C",
    home: true,
    competition: "Premier League (sample)",
    kickoff: "2026-08-29T15:00:00+01:00",
    venue: "American Express Stadium",
  },
  {
    id: "f4",
    opponent: "Sample Opponent D",
    home: true,
    competition: "League Cup (sample)",
    kickoff: "2026-09-16T19:45:00+01:00",
    venue: "American Express Stadium",
  },
];

export function nextHomeFixture(now: Date = new Date()): Fixture | undefined {
  return fixtures
    .filter((f) => f.home && new Date(f.kickoff) > now)
    .sort((a, b) => +new Date(a.kickoff) - +new Date(b.kickoff))[0];
}
