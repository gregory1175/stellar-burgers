import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../services/store';
import { TRole } from './types';

interface ProtectedRouteProps {
  accessRoles: TRole[];
  children: ReactNode;
}

export const ProtectedRoute = ({
  accessRoles,
  children
}: ProtectedRouteProps) => {
  const { user, isLoading, isInit } = useSelector(
    (store: RootState) => store.user
  );

  if (isLoading || !isInit) {
    return <div>Ошибка! У вас нет доступа</div>;
  }

  if (!user || !accessRoles.includes(user.role)) {
    return <Navigate to='/login' />;
  }

  return <>{children}</>;
};
