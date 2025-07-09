import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const user = JSON.parse(localStorage.getItem("auth"));
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
