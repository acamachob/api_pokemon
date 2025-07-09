import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut, FiMenu } from "react-icons/fi";

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-red-200 px-10 py-3 flex justify-between items-center shadow-md">
      {/* Logo a la izquierda */}
      <Link to="/pokemon" className="text-xl font-bold flex items-center space-x-2">
        <img
          src="/pikachu_logo.png"
          alt="Logo"
          className="h-8"
        />
      </Link>

      {/*Esto es la vista de escritorio*/}
      <div className="hidden md:flex space-x-4 text-gray-700 font-medium">
        <Link to="/berries" className="hover:text-blue-600">Berries</Link>
        <Link to="/pokemon" className="hover:text-blue-600">Pokemones</Link>
        <Link to="/pc" className="hover:text-blue-600">PC de Bill</Link>
        <Link to="/perfil" className="hover:text-blue-600 flex items-center space-x-1">
          <FaUserCircle />
          <span>Perfil</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center hover:text-red-600"
        >
          <FiLogOut className="mr-1" />
          Cerrar sesión
        </button>
      </div>

      {/* Este es el menú responsive */}
      <div className="md:hidden relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 focus:outline-none"
        >
          <FiMenu className="text-2xl" />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 bg-white rounded-md shadow-md py-2 px-4 space-y-2 z-50">
            <Link to="/berries" className="block hover:text-blue-600">Berries</Link>
            <Link to="/pokemon" className="block hover:text-blue-600">Pokemones</Link>
            <Link to="/pc" className="block hover:text-blue-600">PC de Bill</Link>
            <Link to="/perfil" className="block hover:text-blue-600">Perfil</Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
