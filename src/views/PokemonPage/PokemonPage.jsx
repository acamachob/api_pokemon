import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokeCard from "../../components/Card/PokeCard";
import Button from "../../components/Button/Button";
import TeamBar from "../../components/TeamBar/TeamBar"; 

function PokemonPage() {
  const { page } = useParams();
  const pageNumber = parseInt(page) || 1;
  const BASE_URL = `https://pokeapi.co/api/v2/pokemon?offset=${
    (pageNumber - 1) * 20
  }&limit=20`;

  const [pokemones, setPokemones] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  useEffect(() => {
    const obtenerPokemones = async () => {
      try {
        const respuesta = await fetch(BASE_URL);
        const datos = await respuesta.json();
        setPokemones(datos.results);
        setNextPage(datos.next ? pageNumber + 1 : null);
        setPrevPage(datos.previous ? pageNumber - 1 : null);
      } catch (error) {
        console.error("Error al realizar la petición", error);
      }
    };

    obtenerPokemones();
  }, [BASE_URL, pageNumber]);

  return (
    <>
      <h1 className="text-3xl font-semibold text-center mt-12">
        Lista de Pokemones
      </h1>
      <div className="px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {pokemones.map((pokemon) => (
            <PokeCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
        <div className="flex justify-center mt-6 gap-4">
          <Button
            prevUrl={prevPage ? `/${prevPage}` : null}
            nextUrl={nextPage ? `/${nextPage}` : null}
          />
        </div>
      </div>

      {/*Esta es la barra flotante*/}
      <TeamBar />
    </>
  );
}

export default PokemonPage;
