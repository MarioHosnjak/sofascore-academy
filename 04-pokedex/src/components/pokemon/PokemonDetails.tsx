import { PokemonType } from "./PokemonType"

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
            <div className="pokemon-details-container">
                <div className="pokemon-details-div">
                    <a className="pokemon-details-name">
                        #{String(pokemonInfo?.id).padStart(4, '0')} {pokemonInfo && pokemonInfo.name.charAt(0).toUpperCase() + pokemonInfo.name.slice(1).toLowerCase()}
                    </a>
                    <a className="pokemon-details-a">Health points: <span>{pokemonInfo?.healthPoints} HP</span></a>
                    <a className="pokemon-details-a">Height: <span>{pokemonInfo?.height} cm</span></a>
                    <a className="pokemon-details-a">Weight: <span>{pokemonInfo?.weight} kg</span></a>
                    <a style={{textWrap: "nowrap"}} className="pokemon-details-a">Type: <span>{pokemonInfo?.type.map((v)=>{return <PokemonType key={v} pokemonType={v} />})}</span></a>
                    <a className="pokemon-details-a">Details: <span>{pokemonInfo?.details}</span></a>
                </div>
                <div className="pokemon-fullview-div" style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    <a className="pokemon-details-a">Full view: </a>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <img style={{height: "120px", width: "120px"}} src={pokemonInfo?.viewFront} alt="Front View"></img>
                        <img style={{height: "120px", width: "120px"}} src={pokemonInfo?.viewBack} alt="Back View"></img>
                    </div>
                </div>
            </div>
        </>
    )
}