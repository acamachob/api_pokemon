import { useEffect, useState } from 'react';
import Button from './components/Button/Button.jsx';
import PokeCard from './components/Card/PokeCard.jsx';

function App() {
  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
  const [pokemones, setPokemones] = useState([]);
  const [url, setUrl] = useState(BASE_URL);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  useEffect(() => {
    const obtenerPokemones = async () => {
      try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        setPokemones(datos.results);
        setNextUrl(datos.next);
        setPrevUrl(datos.previous);
      } catch (error) {
        console.error('Error al realizar la petición', error);
      }
    };

    obtenerPokemones();
  }, [url]);

  return (
    <>
      <h1 className="text-3xl font-semibold text-center mt-12">Lista de Pokemones</h1>
      <div className="px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {pokemones.map((pokemon, index) => (
            <PokeCard key={index} pokemon={pokemon} />
          ))}
        </div>
        <Button prevUrl={prevUrl} nextUrl={nextUrl} setUrl={setUrl} />
      </div>
    </>
  );
}

export default App;
