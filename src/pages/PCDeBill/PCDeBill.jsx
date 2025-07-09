import React from "react";
import usePokemonStore from "../../stores/usePokemonStore";

export default function PCDeBill() {
  const { pc } = usePokemonStore();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">PC de Bill</h1>
      {pc.length === 0 ? (
        <p className="text-gray-500">No tienes Pokémon en la PC.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {pc.map((pokemon) => (
            <div key={pokemon.id} className="bg-white p-4 rounded shadow">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-20 h-20 mx-auto mb-2"
              />
              <h2 className="text-center font-semibold capitalize">
                {pokemon.name}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
