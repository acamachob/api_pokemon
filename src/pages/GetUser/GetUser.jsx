import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GetUser = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const res = await fetch('https://68519cf68612b47a2c0ab990.mockapi.io/pokeusers/v1/users');
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    obtenerUsuarios();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      {user.map(user => (
        <div key={user.id} className="border rounded p-4 mb-2 shadow flex justify-between items-center">
          <div>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Correo:</strong> {user.email}</p>
          </div>
          <button
            onClick={() => navigate(`/editar/${user.id}`)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Editar
          </button>
        </div>
      ))}
    </div>
  );
};

export default GetUser;
