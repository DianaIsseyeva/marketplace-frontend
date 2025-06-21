import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import type { JSX } from 'react';

interface PrivateRouteProps {
  children: JSX.Element;
  role?: 'user' | 'admin' | 'seller';
}

const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
  const user = useSelector((state: RootState) => state.users.user);

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default PrivateRoute;
