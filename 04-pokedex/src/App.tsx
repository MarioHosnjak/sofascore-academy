import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Pokemon } from "./components/Pokemon"

function App() {

  interface PokemonInfo {
    name: string,
    url: string
  }

  const [pokemonArray, setPokemonArray] = useState<PokemonInfo[] | undefined>(undefined)

  useEffect(()=>{
      async function getPokemon() {
        const url = 'https://pokeapi.co/api/v2/pokemon'
        try {
          const response = await fetch(url)
          if (response.status === 200) {
            const pokemonResponse = await response.json()
            console.log(pokemonResponse)
            const resultsArray = pokemonResponse.results
            console.log(resultsArray)
            setPokemonArray(resultsArray)
          }
        } catch (error) {
          console.error(error)
        }
      }
      getPokemon()
  }, [])

  return (
    <>
      <Header/>
      {pokemonArray?.map(v => {
        return (
        <Pokemon key={v.name} url={v.url}/>
      )})}
    </>
  )
}

export default App
