import Country from "./Country"
import Sport from "./Sport"

export default interface Tournament {
    id: number
    name: string
    slug: string
    sport: Sport
    country: Country
}