import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '../contexts/store.context';

export const ProtectedRoute = observer(() => {
  const { user: { isAuthenticated } } = useStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
});
