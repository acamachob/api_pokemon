import { useState } from "react";
import { useNavigate } from "react-router-dom";
const useLogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://68519cf68612b47a2c0ab990.mockapi.io/pokeusers/v1/users"
      );
      const users = await response.json();
      const user = users.find(
        (u) => u.email === values.email && u.password === values.password
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

  return {
    handleLogin,
    handleChange,
    values
  };
};
export default useLogin;
