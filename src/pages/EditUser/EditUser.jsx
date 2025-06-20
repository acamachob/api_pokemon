import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const res = await fetch(`https://68519cf68612b47a2c0ab990.mockapi.io/pokeusers/v1/users/${id}`);
        const data = await res.json();
        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        console.error('Error al obtener usuario:', error);
      }
    };

    obtenerUsuario();
  }, [id]);

  const actualizarUsuario = async (e) => {
    e.preventDefault();
    try {
      await fetch(`https://68519cf68612b47a2c0ab990.mockapi.io/pokeusers/v1/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });
      alert('Usuario actualizado con éxito');
      navigate('/usuarios');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Usuario</h1>
      <form onSubmit={actualizarUsuario}>
        <input
          className="w-full border rounded px-4 py-2 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          required
        />
        <input
          type="email"
          className="w-full border rounded px-4 py-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default EditUser;
