import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeeds } from '../../services/slices/feedSlice/feedSlice';
import {
  getOrdersAll,
  getUserState
} from '../../services/slices/userSlice/userSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const { userOrders, request } = useAppSelector(getUserState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrdersAll());
    dispatch(getFeeds());
  }, []);

  if (request === true) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={userOrders} />;
};
