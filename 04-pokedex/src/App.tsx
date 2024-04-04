import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Pokemon } from "./components/Pokemon"
import { ThemeSelector } from "./components/ThemeSelector";

function App() {

  interface PokemonInfo {
    name: string,
    url: string
  }

  const [pokemonArray, setPokemonArray] = useState<PokemonInfo[] | undefined>([])
  const [fetchUrl, setFetchUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [pokemonNumber, setPokemonNumber] = useState(20)

  useEffect(()=>{
      async function getPokemon() {
        try {
          const response = await fetch(fetchUrl)
          if (response.status === 200) {
            const pokemonResponse = await response.json()
            console.log(pokemonResponse)
            const resultsArray = pokemonResponse.results
            console.log(resultsArray)
            setPokemonArray((v) => v?.concat(resultsArray))
          }
        } catch (error) {
          console.error(error)
        }
      }
      getPokemon()
  }, [fetchUrl])

  useEffect(() => {
    function isBottom(el: HTMLElement) {
      return el.getBoundingClientRect().bottom <= window.innerHeight + 10;
    }

    function trackScrolling() {
      const wrappedElement = document.getElementById('app-container');
      if (wrappedElement && isBottom(wrappedElement)) {
        console.log('app bottom reached');
        // Morao sam staviti mali delay, jer se inače scroll listener više puta aktivira zbog brzine izvođenja
        // Nije bug, nego je feature :)
        setTimeout(() => {
          setPokemonNumber((v) => v + 20)
          setFetchUrl(`https://pokeapi.co/api/v2/pokemon?offset=${pokemonNumber}&limit=20`)
        }, 250)
        document.removeEventListener('scroll', trackScrolling);
      }
    }

    document.addEventListener('scroll', trackScrolling);
    return () => {
      document.removeEventListener('scroll', trackScrolling);
    };
  }, [fetchUrl, pokemonNumber]);

  

  return (
    <ThemeSelector>
      <div id="app-container">
        <Header/>
        {pokemonArray?.map(v => {
          return (
          <Pokemon key={v.name} url={v.url}/>
        )})}
      </div>
    </ThemeSelector>
  )
}

export default App
