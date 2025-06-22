import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";


const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      const response = await fetch(
        "https://68519cf68612b47a2c0ab990.mockapi.io/pokeusers/v1/users"
      );
      const users = await response.json();
      const user = users.find((u) => u.email === email);

      if (user) {
        await fetch(
          `https://68519cf68612b47a2c0ab990.mockapi.io/pokeusers/v1/users/${user.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...user, password: newPassword}),
          }
        );
        alert("Contraseña actualizada");
        navigate("/login");
      } else {
        alert("Correo no encontrado");
      }
    } catch (error) {
      console.error("Error al cambiar contraseña", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-red-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <button
          onClick={() => navigate("/login")}
          className="relative top-3 left-0 text-gray-600 text-2xl hover:text-gray-800"
          aria-label="Volver al login"
        >
          <FiArrowLeft />
        </button>
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Recuperar Contraseña
        </h1>

        <input
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
          type="password"
          placeholder="Nueva Contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
        >
          Actualizar Contraseña
        </button>
      </div>
    </div>
  );
};

export default RecoverPassword;
