import React, { useEffect, useState } from "react";

export default function PokeCard({ pokemon }) {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const respuesta = await fetch(pokemon.url); // Cada Pokémon tiene su propia URL
        const data = await respuesta.json();
        setDatos(data); // Aquí guardamos toda la info del Pokémon
      } catch (error) {
        console.error("Error al obtener el Pokémon", error);
      }
    };

    obtenerDatos();
  }, [pokemon]);

  if (!datos) {
    return <p>Cargando Pokemon...</p>;
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow text-center">
      <img
        src={datos.sprites.front_default}
        alt={pokemon.name}
        className="w-full h-50 object-contain mx-auto"
      />
      <h2 className="text-xl font-semibold capitalize mt-2">{datos.name}</h2>
      <p>ID: {datos.id}</p>
    </div>
  );
}
