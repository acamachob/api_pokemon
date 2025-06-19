import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [id, setId] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const nuevoUsuario = { id, nombre, correo, contraseña: password };
    try {
      await fetch('https://68519cf68612b47a2c0ab990.mockapi.io/pokeusers/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario),
      });
      alert('Usuario registrado con éxito');
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar usuario', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-red-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Registro de Usuario</h1>

        <input className="w-full border border-gray-300 rounded px-4 py-2 mb-4" placeholder="ID"
               value={id} onChange={e => setId(e.target.value)} />
        <input className="w-full border border-gray-300 rounded px-4 py-2 mb-4" placeholder="Nombre"
               value={nombre} onChange={e => setNombre(e.target.value)} />
        <input className="w-full border border-gray-300 rounded px-4 py-2 mb-4" placeholder="Correo"
               value={correo} onChange={e => setCorreo(e.target.value)} />
        <input className="w-full border border-gray-300 rounded px-4 py-2 mb-4" type="password" placeholder="Contraseña"
               value={password} onChange={e => setPassword(e.target.value)} />

        <button onClick={handleRegister} className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
          Registrar
        </button>
      </div>
    </div>
  );
};

export default Register;