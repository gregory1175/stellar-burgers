import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { getUserState } from '../../services/slices/userSlice/userSlice';
import { useAppSelector } from '../../services/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({ onlyUnAuth }: ProtectedRouteProps) => {
  const location = useLocation();

  const data = useAppSelector(getUserState).userData;
  const isAuthChecked = useAppSelector(getUserState).isAuthChecked;
  const isAuthenticated = useAppSelector(getUserState).isAuthenticated;

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (isAuthChecked) {
    return <Preloader />;
  }

  return <Outlet />;
};
