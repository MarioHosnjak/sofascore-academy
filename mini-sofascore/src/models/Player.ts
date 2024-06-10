import Country from "./Country";

export default interface Player {
    id: string,
    name: string,
    slug: string,
    country: Country,
    position: string
}