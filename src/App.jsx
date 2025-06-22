import PropTypes from "prop-types";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import RecoverPassword from "./pages/RecoverPassword/RecoverPassword";
import PokemonPage from "./views/PokemonPage/PokemonPage";
import GetUser from "./pages/GetUser/GetUser";
import EditUser from "./pages/EditUser/EditUser";
import PokemonDetail from "./views/PokemonDetail/PokemonDetail";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("auth"));
  return user ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recover" element={<RecoverPassword />} />

         <Route
        path="/usuarios"
        element={
          <PrivateRoute>
            <GetUser />
          </PrivateRoute>
        }
      />
      <Route
        path="/edituser/:id"
        element={
          <PrivateRoute>
            <EditUser />
          </PrivateRoute>
        }
      />
      <Route
        path="/pokemon"
        element={
          <PrivateRoute>
            <PokemonPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/pokemon/:id"
        element={
          <PrivateRoute>
            <PokemonDetail />
          </PrivateRoute>
        }
      />
      <Route path="/getuser" element={<GetUser />} />
      <Route path="/pokemon/:id" element={<PokemonDetail />} />
      <Route
        path="/:page"
        element={
          <PrivateRoute>
            <PokemonPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/edituser/:id"
        element={
          <PrivateRoute>
            <EditUser />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
