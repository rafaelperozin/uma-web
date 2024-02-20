import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const isAuthenticated = false; // TODO: Implement the authentication logic
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
