import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Pokemon } from "./components/pokemon/Pokemon"
import { ThemeSelector } from "./components/ThemeSelector";
import ThemeContext from "./components/context/ThemeContext";

function App() {

  interface PokemonInfo {
    name: string,
    url: string
  }

  const [pokemonArray, setPokemonArray] = useState<PokemonInfo[] | undefined>([])
  const [fetchUrl, setFetchUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [pokemonNumber, setPokemonNumber] = useState(20)

  // Gleda se default tema browsera
  const [isDark, setIsDark] = useState<boolean>(window.matchMedia("(prefers-color-scheme: dark)").matches)

  useEffect(()=>{
      async function getPokemon() {
        try {
          const response = await fetch(fetchUrl)
          if (response.status === 200) {
            const pokemonResponse = await response.json()
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
          // na promjenu URL-a pokrece se useEffect iznad, koji dodaje jos 20 pokemona
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
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <ThemeSelector>
        <div id="app-container">
          <Header/>
          {pokemonArray?.map(v => {
            return (
            <Pokemon key={v.name} url={v.url}/>
          )})}
        </div>
      </ThemeSelector>
    </ThemeContext.Provider>
  )
}

export default App
