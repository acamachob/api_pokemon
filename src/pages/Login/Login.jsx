import { Link } from "react-router-dom";
import useLogin from "./useLogin";
const Login = () => {

 const {values, handleChange, handleLogin} = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-red-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col items-center">
        <img src="/logo_poke.png" alt="Logo" className="w-30 h-30 mb-4" />
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Iniciar Sesión</h1>

        <input
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Correo"
          name="email"
          type="email"
          value={values.correo}
          onChange={handleChange}
        />

        <input
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          placeholder="password"
          name="password"
          value={values.password}
          onChange={handleChange}
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
