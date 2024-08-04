import { expect } from '@jest/globals';
import store, { rootReducer } from '../../services/store';

test('Тестирование работы RootReducer', () => {
  const testreducer = rootReducer(undefined, { type: 'TEST_ACTION' });
  expect(testreducer).toEqual(store.getState());
});
