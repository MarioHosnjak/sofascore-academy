interface pokemonDetails {
    id: number,
    name: string,
    healthPoints: number,
    height: number,
    weight: number,
    type: string[],
    details?: string,
    viewFront: string,
    viewBack: string,
    picture: string
}


export const PokemonDetails = ({pokemonInfo}: {pokemonInfo:pokemonDetails|undefined}) => {



    return (
        <>
            <div className="pokemon-details-div">
                <a className="pokemon-details-name">
                    #{String(pokemonInfo?.id).padStart(4, '0')} {pokemonInfo && pokemonInfo.name.charAt(0).toUpperCase() + pokemonInfo.name.slice(1).toLowerCase()}
                </a>
                <a className="pokemon-details-a">Health points: <span>{pokemonInfo?.healthPoints} HP</span></a>
                <a className="pokemon-details-a">Height: <span>{pokemonInfo?.height} cm</span></a>
                <a className="pokemon-details-a">Weight: <span>{pokemonInfo?.weight} kg</span></a>
                <a className="pokemon-details-a">Type: <span>{pokemonInfo?.type.map((v)=>{return v + " "})}</span></a>
                <a className="pokemon-details-a">Details: <span>{pokemonInfo?.details}</span></a>
            </div>
        </>
    )
}