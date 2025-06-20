import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function PokeCard({ pokemon }) {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const respuesta = await fetch(pokemon.url);
        const data = await respuesta.json();
        setDatos(data);
      } catch (error) {
        console.error("Error al obtener el Pokémon", error);
      }
    };

    obtenerDatos();
  }, [pokemon]);

  if (!datos) {
    return <p className="text-center">Cargando Pokémon...</p>;
  }

  return (
    <Link
      to={`/pokemon/${datos.id}`}
      className="bg-white hover:bg-gray-200 rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 text-center flex flex-col items-center"
    >
      <img
        src={datos.sprites.front_default}
        alt={datos.name}
        className="w-24 h-24 object-contain mb-2"
      />
      <h2 className="text-lg font-semibold capitalize">{datos.name}</h2>
      <p className="text-sm text-gray-600">ID: {datos.id}</p>
    </Link>
  );
}

PokeCard.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};
