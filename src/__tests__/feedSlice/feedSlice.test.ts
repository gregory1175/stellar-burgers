import { expect } from '@jest/globals';
import feedSlice, {
  getFeeds,
  initialState
} from '../../services/slices/feedSlice/feedSlice';

describe('Тестирование редьюсера feedSlice', () => {
  describe('Тестирование асинхронного экшена getFeeds', () => {
    const actions = {
      pending: {
        type: getFeeds.pending.type,
        payload: null
      },
      rejected: {
        type: getFeeds.rejected.type,
        error: { message: 'SomeError' }
      },
      fulfilled: {
        type: getFeeds.fulfilled.type,
        payload: { orders: ['order', 'moreOrder'], total: 2, totalToday: 2 }
      }
    };
    it('тест синхронного экшена getFeeds.pending', () => {
      const state = feedSlice(initialState, actions.pending);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull;
    });
    it('тест синхронного экшена getFeeds.rejected', () => {
      const state = feedSlice(initialState, actions.rejected);
      expect(state.error).toBe(actions.rejected.error.message);
      expect(state.loading).toBe(false);
    });
    it('тест синхронного экшена getFeeds.fulfilled', () => {
      const state = feedSlice(initialState, actions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull;
      expect(state.orders).toEqual(actions.fulfilled.payload.orders);
      expect(state.total).toBe(actions.fulfilled.payload.total);
      expect(state.totalToday).toBe(actions.fulfilled.payload.totalToday);
    });
  });
});
