import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://68519cf68612b47a2c0ab990.mockapi.io/pokeusers/v1/users"
      );
      const users = await response.json();
      const user = users.find(
        (u) => u.correo === correo && u.contraseña === password
      );
      if (user) {
        localStorage.setItem("auth", JSON.stringify(user));
        navigate("/1");
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-red-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col items-center">
        <img src="/public/logo_poke.png" alt="Logo" className="w-30 h-30 mb-4" />
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Iniciar Sesión</h1>

        <input
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <input
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Ingresar
        </button>

        {}
        <Link
          to="/register"
          className="mt-4 text-blue-600 hover:underline text-sm"
        >
          ¿No tienes cuenta? Regístrate
        </Link>

        {}
        <Link
          to="/recover"
          className="mt-2 text-blue-500 hover:underline text-sm"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
    </div>
  );
};

export default Login;
