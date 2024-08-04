import { expect } from '@jest/globals';
import userSlice, {
  getUser,
  getOrdersAll,
  initialState,
  registerUser,
  loginUser,
  updateUser,
  logoutUser
} from '../../services/slices/userSlice/userSlice';

describe('Тестирование редьюсера userSlice', () => {
  describe('Тестирование ассинхронного экшена registerUser', () => {
    const actions = {
      pending: {
        type: registerUser.pending.type,
        payload: null
      },
      rejected: {
        type: registerUser.rejected.type,
        error: { message: 'SomeError' }
      },
      fulfilled: {
        type: registerUser.fulfilled.type,
        payload: { user: { name: 'UserName', email: 'UserEmail' } }
      }
    };
    it('Тестирование синхронного экшена registerUser.pending', () => {
      const state = userSlice(initialState, actions.pending);
      expect(state.request).toBe(true);
      expect(state.error).toBeNull;
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(false);
    });
    it('Тестирование синхронного экшена registerUser.rejected', () => {
      const state = userSlice(initialState, actions.rejected);
      expect(state.request).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
      expect(state.isAuthChecked).toBe(false);
    });
    it('Тестирование синхронного экшена registerUser.fulfilled', () => {
      const state = userSlice(initialState, actions.fulfilled);
      expect(state.request).toBe(false);
      expect(state.error).toBeNull;
      expect(state.response).toEqual(actions.fulfilled.payload.user);
      expect(state.userData).toEqual(actions.fulfilled.payload.user);
      expect(state.isAuthChecked).toBe(false);
      expect(state.isAuthenticated).toBe(true);
    });
  });

  describe('Тестирование ассинхронного экшена loginUser', () => {
    const actions = {
      pending: {
        type: loginUser.pending.type,
        payload: null
      },
      rejected: {
        type: loginUser.rejected.type,
        error: { message: 'SomeError' }
      },
      fulfilled: {
        type: loginUser.fulfilled.type,
        payload: { user: { name: 'UserName', email: 'UserEmail' } }
      }
    };
    it('Тестирование синхронного экшена loginUse.pending', () => {
      const state = userSlice(initialState, actions.pending);
      expect(state.loginUserRequest).toBe(true);
      expect(state.error).toBeNull;
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(false);
    });
    it('Тестирование синхронного экшена loginUse.rejected', () => {
      const state = userSlice(initialState, actions.rejected);
      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
    });
    it('Тестирование синхронного экшена loginUse.fulfilled', () => {
      const state = userSlice(initialState, actions.fulfilled);
      expect(state.error).toBeNull;
      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthChecked).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.userData).toEqual(actions.fulfilled.payload.user);
    });
  });

  describe('Тестирование ассинхронного экшена getUser', () => {
    const actions = {
      pending: {
        type: getUser.pending.type,
        payload: null
      },
      rejected: {
        type: getUser.rejected.type,
        payload: null
      },
      fulfilled: {
        type: getUser.fulfilled.type,
        payload: { user: { name: 'someName', email: 'someEmail' } }
      }
    };
    it('Тестирование синхронного экшена getUser.pending', () => {
      const state = userSlice(initialState, actions.pending);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(true);
      expect(state.loginUserRequest).toBe(true);
    });
    it('Тестирование синхронного экшена getUser.rejected', () => {
      const state = userSlice(initialState, actions.rejected);
      expect(state.isAuthChecked).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.loginUserRequest).toBe(false);
    });
    it('Тестирование синхронного экшена getUser.fulfilled', () => {
      const state = userSlice(initialState, actions.fulfilled);
      expect(state.isAuthenticated).toBe(true);
      expect(state.loginUserRequest).toBe(false);
      expect(state.userData).toEqual(actions.fulfilled.payload.user);
      expect(state.isAuthChecked).toBe(false);
    });
  });

  describe('Тестирование ассинхронного экшена updateUser', () => {
    const actions = {
      pending: {
        type: updateUser.pending.type,
        payload: null
      },
      rejected: {
        type: updateUser.rejected.type,
        error: { message: 'SomeError' }
      },
      fulfilled: {
        type: updateUser.fulfilled.type,
        payload: { user: { name: 'someName', email: 'someEmail' } }
      }
    };
    it('Тестирование синхронного экшена updateUser.pending', () => {
      const state = userSlice(initialState, actions.pending);
      expect(state.request).toBe(true);
      expect(state.error).toBeNull;
    });
    it('Тестирование синхронного экшена updateUser.rejected', () => {
      const state = userSlice(initialState, actions.rejected);
      expect(state.request).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
    });
    it('Тестирование синхронного экшена updateUser.fulfilled', () => {
      const state = userSlice(initialState, actions.fulfilled);
      expect(state.request).toBe(false);
      expect(state.error).toBeNull;
      expect(state.response).toEqual(actions.fulfilled.payload.user);
    });
  });

  describe('Тестирование ассинхронного экшена logoutUser', () => {
    const actions = {
      pending: {
        type: logoutUser.pending.type,
        payload: null
      },
      rejected: {
        type: logoutUser.rejected.type,
        error: { message: 'SomeError' }
      },
      fulfilled: {
        type: logoutUser.fulfilled.type,
        payload: null
      }
    };
    it('Тестирование синхронного экшена logoutUser.pending', () => {
      const state = userSlice(initialState, actions.pending);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBeNull;
      expect(state.request).toBe(true);
    });
    it('Тестирование синхронного экшена logoutUser.rejected', () => {
      const state = userSlice(initialState, actions.rejected);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
      expect(state.request).toBe(false);
    });
    it('Тестирование синхронного экшена logoutUser.fulfilled', () => {
      const state = userSlice(initialState, actions.fulfilled);
      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBeNull;
      expect(state.request).toBe(false);
      expect(state.userData).toBe(actions.fulfilled.payload);
    });
  });

  describe('Тестирование ассинхронного экшена getOrdersAll', () => {
    const actions = {
      pending: {
        type: getOrdersAll.pending.type,
        payload: null
      },
      rejected: {
        type: getOrdersAll.rejected.type,
        error: { message: 'SomeError' }
      },
      fulfilled: {
        type: getOrdersAll.fulfilled.type,
        payload: ['order', 'moreOrder']
      }
    };
    it('Тестирование синхронного экшена logoutUser.pending', () => {
      const state = userSlice(initialState, actions.pending);
      expect(state.error).toBeNull;
      expect(state.request).toBe(true);
    });
    it('Тестирование синхронного экшена logoutUser.rejected', () => {
      const state = userSlice(initialState, actions.rejected);
      expect(state.error).toBe(actions.rejected.error.message);
      expect(state.request).toBe(false);
    });
    it('Тестирование синхронного экшена logoutUser.fulfilled', () => {
      const state = userSlice(initialState, actions.fulfilled);
      expect(state.error).toBeNull;
      expect(state.request).toBe(false);
      expect(state.userOrders).toEqual(actions.fulfilled.payload);
    });
  });
});
