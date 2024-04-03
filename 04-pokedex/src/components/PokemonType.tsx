export const PokemonType = ({pokemonType}: {pokemonType:string}) => {

    const colorDictionary: { [key: string]: string }  = {
        "normal": "#A8A878",
        "fire": "#F08030",
        "water": "#6890F0",
        "grass": "#78C850",
        "electric": "#F8D030",
        "ice": "#98D8D8",
        "fighting": "#C03028",
        "ground": "#E0C068",
        "poison": "#A040A0",
        "flying": "#A890F0",
        "psychic": "#F85888",
        "ghost": "#705898",
        "steel": "#B8B8D0",
        "fairy": "#F0B6BC"
    }


    return (
        <>
            <span className="pokemon-type-span" style={{backgroundColor: colorDictionary[pokemonType], color: "white"}}>{pokemonType}</span>
        </>
    )
}