import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
  getFeeds,
  getFeedState
} from '../../services/slices/feedSlice/feedSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const Feed: FC = () => {
  const { orders, loading } = useAppSelector(getFeedState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
