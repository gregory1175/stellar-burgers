import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  getError,
  getUserState,
  loginUser
} from '../../services/slices/userSlice/userSlice';
import { Navigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useAppSelector(getError);

  const { isAuthenticated } = useAppSelector(getUserState);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  if (isAuthenticated) {
    return <Navigate to={'/'} />;
  }

  return (
    <LoginUI
      errorText={error?.toString()}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
