// Travel knowledge base for reaching the American Express Stadium, Falmer.
// ILLUSTRATIVE CONTENT — timings and service details are typical patterns,
// not live data. Verify against official travel guidance before a real matchday.
// This same content grounds the AI assistant's answers (see src/lib/assistant.ts).

export interface TravelOption {
  id: string;
  mode: string;
  headline: string;
  detail: string;
  leadTimeMinutes: number; // suggested time before kickoff to set off / arrive
  goodFor: string;
}

export const travelOptions: TravelOption[] = [
  {
    id: "train",
    mode: "Train",
    headline: "Falmer station is next to the stadium",
    detail:
      "Falmer station sits a short walk from the turnstiles. Services run from Brighton and from the Lewes direction, with queuing systems in place after the final whistle. Matchday tickets often include local travel — check yours.",
    leadTimeMinutes: 90,
    goodFor: "Most fans, especially from Brighton, Lewes, and the coastway",
  },
  {
    id: "bus",
    mode: "Bus",
    headline: "Dedicated matchday services from the city",
    detail:
      "Frequent matchday buses run from central Brighton and connecting points. They fill up close to kickoff, so earlier is calmer.",
    leadTimeMinutes: 100,
    goodFor: "City-centre starts and anyone avoiding train queues",
  },
  {
    id: "park-ride",
    mode: "Park & Ride",
    headline: "Park out of town, ride in",
    detail:
      "Matchday park and ride sites operate on the edge of the city with buses to the stadium. Pre-booking is normally required and spaces go quickly for big fixtures.",
    leadTimeMinutes: 120,
    goodFor: "Drivers from outside Brighton who want to skip stadium-area restrictions",
  },
  {
    id: "cycle",
    mode: "Cycle",
    headline: "Cycle parking at the stadium",
    detail:
      "Cycle racks are available near the stadium and the route from Brighton is mostly on shared paths. Bring lights for evening kickoffs.",
    leadTimeMinutes: 60,
    goodFor: "Local fans and anyone dodging traffic entirely",
  },
  {
    id: "car",
    mode: "Car",
    headline: "Think twice — restrictions apply",
    detail:
      "An event-day parking scheme operates around the stadium, so on-street parking nearby is heavily restricted. If you must drive, park and ride is usually the better version of this plan.",
    leadTimeMinutes: 150,
    goodFor: "Accessible parking permit holders and pre-booked spaces only",
  },
];

export const checklistTemplate: string[] = [
  "Match ticket (phone charged if digital)",
  "Check travel — engineering works or road closures?",
  "Layers — the concourse breeze is real",
  "Arrive early enough to soak it in",
  "Agree a meeting point if you split up",
  "Cash-free stadium — card or phone ready",
];
