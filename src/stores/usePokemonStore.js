import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePokemonStore = create(persist(
  (set, get) => ({
    equipo: [], // Este es el array de equipo 
    pc: [],     // Los pokemones que se envian a la PC de Bill

    // Agrega un Pokémon al equipo si hay espacio en la barra
    agregarPokemon: (pokemon) => {
      const equipoActual = get().equipo;
      if (equipoActual.length < 6 && !equipoActual.find(p => p.id === pokemon.id)) {
        set({ equipo: [...equipoActual, pokemon] });
      }
    },

    // Elimina un Pokémon del equipo y lo envía al PC
    enviarAPC: (pokemonId) => {
      const equipoActual = get().equipo;
      const pcActual = get().pc;
      const pokemon = equipoActual.find(p => p.id === pokemonId);
      if (pokemon) {
        set({
          equipo: equipoActual.filter(p => p.id !== pokemonId),
          pc: [...pcActual, pokemon],
        });
      }
    },

    // Reorganiza el equipo de Pokémon (drag and drop)
    reordenarEquipo: (nuevoOrden) => {
      set({ equipo: nuevoOrden });
    },

    // Reinicia los estados del equipo y PC
    resetear: () => set({ equipo: [], pc: [] }),
  }),
  {
    name: 'pokemon-storage',
    getStorage: () => localStorage,
  }
));

export default usePokemonStore;
