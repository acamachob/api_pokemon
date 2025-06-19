import { useEffect, useState } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import PokeCard from '../components/Card/PokeCard.jsx';

function PokemonPage() {
  const { pageNumber } = useParams();
  const page = parseInt(pageNumber) || 1; 
  const BASE_URL = `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`;

  const [pokemones, setPokemones] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const obtenerPokemones = async () => {
      try {
        const respuesta = await fetch(BASE_URL);
        const datos = await respuesta.json();
        setPokemones(datos.results);
        setNextPage(page + 1);
        setPrevPage(page > 1 ? page - 1 : null);
      } catch (error) {
        console.error('Error al realizar la petición', error);
      }
    };

    obtenerPokemones();
  }, [BASE_URL, page]);

  return (
    <>
      <h1 className="text-3xl font-semibold text-center mt-12">Lista de Pokemones</h1>
      <div className="px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {pokemones.map((pokemon) => (
            <PokeCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
        <div className="flex justify-center mt-6 gap-4">
          {prevPage && (
            <button onClick={() => navigate(`/${prevPage}`)} className="bg-blue-500 px-4 py-2 rounded text-white">
              ← Anterior
            </button>
          )}
          {nextPage && (
            <button onClick={() => navigate(`/${nextPage}`)} className="bg-blue-500 px-4 py-2 rounded text-white">
              Siguiente →
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PokemonPage />} />
      <Route path="/:pageNumber" element={<PokemonPage />} />
    </Routes>
  );
}

export default App;
