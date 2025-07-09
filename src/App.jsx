import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import RecoverPassword from "./pages/RecoverPassword/RecoverPassword";
import PokemonPage from "./views/PokemonPage/PokemonPage";
import GetUser from "./pages/GetUser/GetUser";
import EditUser from "./pages/EditUser/EditUser";
import PokemonDetail from "./views/PokemonDetail/PokemonDetail";
import PrivateRoute from "./Routes/PrivateRoute";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Berries from "./views/Berries/Berries";
import PCBill from "./views/PcBill/PcBill";
import Profile from "./views/Profile/Profile";
import PCDeBill from "./pages/PCDeBill/PCDeBill";



function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("auth")
  );

  useEffect(() => {
    const user = localStorage.getItem("auth");
    setIsAuthenticated(!!user);
  }, [location]);

  const noNavbarRoutes = ["/login", "/register", "/recover"];
  const hideNavbar = noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && isAuthenticated && <NavigationBar />}

      <Routes>
        {/* Estas son las rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recover" element={<RecoverPassword />} />

        {/* Estas son las rutas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="/usuarios" element={<GetUser />} />
          <Route path="/edituser/:id" element={<EditUser />} />
          <Route path="/pokemon" element={<PokemonPage />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/:page" element={<PokemonPage />} />
          <Route path="/berries" element={<Berries />} />
          <Route path="/pc" element={<PCBill />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/pc" element={<PCDeBill />} />
        </Route>

        {/* Redirección al login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
