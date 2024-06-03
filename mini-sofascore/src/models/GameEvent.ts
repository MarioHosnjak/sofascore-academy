import Country from "./Country"
import Tournament from "./Tournament"

export default interface GameEvent {
    id: number,
    slug: string,
    tournament: Tournament,
    homeTeam: {
        id: number,
        name: string,
        country: Country
    },
    awayTeam: {
        id: number,
        name: string,
        country: Country
    },
    status: "notstarted" | "finished" | "playing",
    startDate: Date,
    homeScore: {
        total: number,
        period1: number,
        period2: number,
        period3: number,
        period4: number,
        overtime: number
    },
    awayScore: {
        total: number,
        period1: number,
        period2: number,
        period3: number,
        period4: number,
        overtime: number
    },
    winnerCode: "home" | "away" | "draw",
    round: number
}
