import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/auth.store.js';

const RedirectRoute = ({ children }) => {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default RedirectRoute;
