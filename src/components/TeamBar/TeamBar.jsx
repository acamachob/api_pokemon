import { useState } from "react";
import usePokemonStore from "../../stores/usePokemonStore";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortablePokemon({ pokemon, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: pokemon.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative"
    >
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="w-14 h-14 rounded-full bg-white border-2 border-white object-contain"
      />
      <button
        className="absolute -top-2 -right-2 text-xs text-white bg-black rounded-full w-5 h-5 flex items-center justify-center"
        onClick={() => onRemove(pokemon)}
        title="Enviar a la PC de Bill"
      >
        <FaTimes size={10} />
      </button>
    </div>
  );
}

export default function TeamBar() {
  const {
    equipo: team,
    enviarAPC,
    reordenarEquipo,
  } = usePokemonStore();

  const [isOpen, setIsOpen] = useState(true);
  const [confirmModal, setConfirmModal] = useState({ visible: false, pokemon: null });

  const handleRemove = (pokemon) => {
    setConfirmModal({ visible: true, pokemon });
  };

  const confirmRemoval = () => {
    if (confirmModal.pokemon) {
      enviarAPC(confirmModal.pokemon.id);
    }
    setConfirmModal({ visible: false, pokemon: null });
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = team.findIndex(p => p.id === active.id);
      const newIndex = team.findIndex(p => p.id === over?.id);
      const nuevoOrden = arrayMove(team, oldIndex, newIndex);
      reordenarEquipo(nuevoOrden);
    }
  };

  return (
    <>
      {/* Modal de confirmación */}
      {confirmModal.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 w-80 shadow-xl text-center">
            <h2 className="text-lg font-semibold mb-4">¿Estás seguro?</h2>
            <p className="mb-4 text-sm text-gray-700">
              ¿Quieres enviar a <strong className="capitalize">{confirmModal.pokemon?.name}</strong> a la PC de Bill?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-1 rounded hover:bg-gray-400"
                onClick={() => setConfirmModal({ visible: false, pokemon: null })}
              >
                Cancelar
              </button>
              <button
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                onClick={confirmRemoval}
              >
                Sí, enviarlo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Barra flotante */}
      <div
        className={`fixed top-20 right-0 z-50 transition-all duration-300 ${
          isOpen ? "w-24" : "w-12"
        } bg-red-600 rounded-l-xl shadow-lg flex flex-col items-center py-4`}
      >
        <button
          className="mb-4 bg-white text-red-600 p-1 rounded-full shadow"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaMinus /> : <FaPlus />}
        </button>

        {isOpen ? (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={team.map(p => p.id)} strategy={verticalListSortingStrategy}>
              <div className="flex flex-col items-center gap-4">
                {team.map((pokemon) => (
                  <SortablePokemon
                    key={pokemon.id}
                    pokemon={pokemon}
                    onRemove={handleRemove}
                  />
                ))}

                {Array.from({ length: 6 - team.length }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="w-14 h-14 rounded-full bg-white border-2 border-white"
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <img
            src="/pokeball_icon.png"
            alt="Abrir equipo"
            className="w-15 h-15 mt-2"
          />
        )}
      </div>
    </>
  );
}
