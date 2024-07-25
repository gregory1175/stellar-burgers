import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '../../services/store';
import { ProtectedRoute } from '../protected-route/protected-route';

const App = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const background = location.state?.background;
  const [modal, setModal] = useState(false);

  const handeleModalClose = () => {
    setModal(false);
  };

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='' onClose={handeleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/feed/:number'
            element={
              <Modal title='' onClose={handeleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route element={<ProtectedRoute onlyUnAuth />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
          </Route>
          <Route element={<ProtectedRoute onlyUnAuth={false} />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/orders' element={<ProfileOrders />} />
          </Route>
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='' onClose={handeleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </div>
      ;
    </>
  );
};
export default App;
