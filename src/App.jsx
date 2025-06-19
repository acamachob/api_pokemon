import PropTypes from 'prop-types';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register';
import RecoverPassword from './pages/RecoverPassword';
import PokemonPage from './views/PokemonPage';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('auth'));
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
          path="/:page"
          element={
            <PrivateRoute>
              <PokemonPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
  );
}

export default App;
