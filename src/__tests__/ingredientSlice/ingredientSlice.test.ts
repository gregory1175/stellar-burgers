import { expect } from '@jest/globals';
import ingredientSlice, {
  getIngredients,
  initialState
} from '../../services/slices/ingredientSlice/ingredientSlice';

describe('Тестирование редьюсера ingredientSlice', () => {
  describe('Тестирование асинхронного экшена getIngredients', () => {
    const actions = {
      pending: {
        type: getIngredients.pending.type,
        payload: null
      },
      rejected: {
        type: getIngredients.rejected.type,
        error: { message: 'SomeError' }
      },
      fulfilled: {
        type: getIngredients.fulfilled.type,
        payload: ['ingredient', 'moreIngredient']
      }
    };
    it('Тестирование синхронного экшена getIngredients.pending', () => {
      const state = ingredientSlice(initialState, actions.pending);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull;
    });
    it('Тестирование синхронного экшена getIngredients.rejected', () => {
      const state = ingredientSlice(initialState, actions.rejected);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
    });
    it('Тестирование синхронного экшена getIngredients.fulfilled', () => {
      const state = ingredientSlice(initialState, actions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull;
      expect(state.ingredients).toBe(actions.fulfilled.payload);
    });
  });
});
