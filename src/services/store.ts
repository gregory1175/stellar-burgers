import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';
import ingredientSlice from './slices/ingredientSlice/ingredientSlice';
import orderSlice from './slices/orderSlice/orderSlice';
import constructorSlice from './slices/constructorSlice/constructorSlice';
import feedSlice from './slices/feedSlice/feedSlice';
import userSlice from './slices/userSlice/userSlice';

export const rootReducer = combineReducers({
  ingredient: ingredientSlice,
  order: orderSlice,
  constructorBurger: constructorSlice,
  feed: feedSlice,
  user: userSlice
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () =>
  useReduxDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default store;
