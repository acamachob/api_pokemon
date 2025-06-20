import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const nuevoUsuario = { name, email, password };

    try {
      await fetch(
        "https://68519cf68612b47a2c0ab990.mockapi.io/pokeusers/v1/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoUsuario),
        }
      );
      alert("Usuario registrado con éxito");
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar usuario", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-red-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <button
          onClick={() => navigate("/login")}
          className="relative top-3 left-0 text-gray-600 text-2xl hover:text-gray-800"
          aria-label="Volver al login"
        ><FiArrowLeft />
        </button>
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Registro de Usuario
        </h1>

        <form onSubmit={handleRegister}>
          <input
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mb-4"
          >
            Registrar
          </button>

        </form>
      </div>
    </div>
  );
};

export default Register;
