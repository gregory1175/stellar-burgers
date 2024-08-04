import { expect } from '@jest/globals';
import orderSlice, {
  initialState,
  getOrderByNumber
} from '../../services/slices/orderSlice/orderSlice';

describe('Тестирование редьюсера orderSlice', () => {
  describe('Тестирование асинхронного getOrderByNumber', () => {
    const actions = {
      pending: {
        type: getOrderByNumber.pending.type,
        payload: null
      },
      rejected: {
        type: getOrderByNumber.rejected.type,
        error: { message: 'SomeError' }
      },
      fulfilled: {
        type: getOrderByNumber.fulfilled.type,
        payload: { orders: ['order', 'moreOrder'] }
      }
    };
    it('Тестирование синхронного экшена getOrderByNumber.pending', () => {
      const state = orderSlice(initialState, actions.pending);
      expect(state.error).toBeNull;
      expect(state.request).toBe(true);
    });
    it('Тестирование синхронного экшена getOrderByNumber.rejected', () => {
      const state = orderSlice(initialState, actions.rejected);
      expect(state.error).toBe(actions.rejected.error.message);
      expect(state.request).toBe(false);
    });
    it('Тестирование синхронного экшена getOrderByNumber.fulfilled', () => {
      const state = orderSlice(initialState, actions.fulfilled);
      expect(state.error).toBeNull;
      expect(state.request).toBe(false);
      expect(state.orderByNumberResponse).toEqual(
        actions.fulfilled.payload.orders[0]
      );
    });
  });
});
