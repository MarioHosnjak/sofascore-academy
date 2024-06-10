import GameEvent from "@/models/GameEvent"

export function groupEventsByRound(events: GameEvent[]): { [round: number]: GameEvent[] } {
    return events.reduce((acc, event) => {
      if (!acc[event.round]) {
        acc[event.round] = [];
      }
      acc[event.round].push(event);
      return acc;
    }, {} as { [round: number]: GameEvent[] });
  }