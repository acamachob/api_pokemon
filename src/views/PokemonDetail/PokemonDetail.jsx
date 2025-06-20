import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const obtenerDetalle = async () => {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await respuesta.json();
      setPokemon(data);
    };
    obtenerDetalle();
  }, [id]);

  if (!pokemon) return <p className="text-center mt-8">Cargando detalles...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="mx-auto"
      />
      <h1 className="text-2xl font-bold text-center capitalize mt-4">
        {pokemon.name}
      </h1>
      <p className="text-center">ID: {pokemon.id}</p>
      <p className="text-center">Altura: {pokemon.height}</p>
      <p className="text-center">Peso: {pokemon.weight}</p>
      <p className="text-center">
        Tipos:{" "}
        {pokemon.types.map((tipo) => tipo.type.name).join(", ")}
      </p>
    </div>
  );
}
