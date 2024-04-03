import { useEffect, useState } from "react"
import { PokemonDetails } from "./PokemonDetails"
import { PokemonPicture } from "./PokemonPicture"

export const Pokemon = ({url}: {url:string}) => {

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

    const [pokemonInfo, setPokemonInfo] = useState<pokemonDetails | undefined>(undefined)

    useEffect(() => {
        async function getPokemonDetails() {
            try {
              const response = await fetch(url)
              if (response.status === 200) {
                const pokemonResponse = await response.json()
                //console.log(pokemonResponse)
                const tmp = {
                    id: pokemonResponse.id,
                    name: pokemonResponse.name,
                    healthPoints: pokemonResponse.stats[0].base_stat,
                    height: pokemonResponse.height * 10,
                    weight: pokemonResponse.weight,
                    type: pokemonResponse.types.map((v) => {return v.type.name}),
                    details: "",
                    viewFront: pokemonResponse.sprites.front_default,
                    viewBack: pokemonResponse.sprites.back_default,
                    picture: pokemonResponse.sprites.other['official-artwork'].front_default
                }
                const detailsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${tmp.id}`)
                const details = await detailsResponse.json()
                // Pronalazi opis gdje je verzija "red" i jezik "en", replacea '\n' i '\f' u textu s razmakom
                tmp.details = details.flavor_text_entries.filter(entry => entry.version.name === "red" && entry.language.name === "en")[0].flavor_text.replace(/[\n\f]/g, ' ')
                setPokemonInfo(tmp)
                console.log(tmp)
              }
            } catch (error) {
              console.error(error)
            }
          }
          getPokemonDetails()
    }, [url])


    return (
        <>
            <div style={{display: "flex", flexDirection: pokemonInfo?.id && pokemonInfo.id % 2 == 0 ? "row" : "row-reverse"}}>
                <PokemonDetails pokemonInfo={pokemonInfo}/>
                <PokemonPicture pictureUrl={pokemonInfo?.picture} pictureLocation={pokemonInfo?.id && pokemonInfo.id % 2 == 0 ? "flex-start" : "flex-end"}/>
            </div>
        </>
    )
} 