import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getUserState } from '../../services/slices/userSlice/userSlice';
import { useAppSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const data = useAppSelector(getUserState).userData;
  return <AppHeaderUI userName={'' || data?.name} />;
};
