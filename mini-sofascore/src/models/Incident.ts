import Player from "./Player"

export default interface Incident {
    id: number,
    time: number,
    type: 'card' | 'goal' | 'period',
    player: Player,
    teamSide: 'home' | 'away',
    color: "yellow" | "yellowred" | "red",
    scoringTeam: 'home' | 'away',
    homeScore: number,
    awayScore: number,
    goalType: 'regular' | 'owngoal' | 'penalty' | 'onepoint' | 'twopoint' | 'threepoint' | 'touchdown' | 'safety' | 'fieldgoal' | 'extrapoint',
    text: string
}
