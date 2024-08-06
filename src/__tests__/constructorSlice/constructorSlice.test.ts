import { expect } from '@jest/globals';
import constructorSlice, {
  addIngredient,
  initialState,
  moveIngredientDown,
  moveIngredientUp,
  orderBurger,
  removeIngredient
} from '../../services/slices/constructorSlice/constructorSlice';

describe('Тестирование редьюсера constructorSlice', () => {
  describe('Тестирование экшена addIngredient', () => {
    const dataResult = {
      ...initialState,
      constructorItems: {
        bun: {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa0949',
            name: 'Мини-салат Экзо-Плантаго',
            type: 'main',
            proteins: 1,
            fat: 2,
            carbohydrates: 3,
            calories: 6,
            price: 4400,
            image: 'https://code.s3.yandex.net/react/code/salad.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/salad-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/salad-large.png'
          }
        ]
      }
    };
    it('Добавление ингредиента в массив ingredients', () => {
      const state = constructorSlice(
        initialState,
        addIngredient({
          _id: '643d69a5c3f7b9001cfa0949',
          name: 'Мини-салат Экзо-Плантаго',
          type: 'main',
          proteins: 1,
          fat: 2,
          carbohydrates: 3,
          calories: 6,
          price: 4400,
          image: 'https://code.s3.yandex.net/react/code/salad.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/salad-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/salad-large.png'
        })
      );

      const ingredient = state.constructorItems.ingredients[0];
      const takedIngredients = dataResult.constructorItems.ingredients[0];

      expect(ingredient).toEqual({
        ...takedIngredients,
        id: expect.any(String)
      });
    });
  });

  describe('Тестирование экшена removeIngredient', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            id: 'myIng',
            _id: '643d69a5c3f7b9001cfa0940',
            name: 'Говяжий метеорит (отбивная)',
            type: 'main',
            proteins: 800,
            fat: 800,
            carbohydrates: 300,
            calories: 2674,
            price: 3000,
            image: 'https://code.s3.yandex.net/react/code/meat-04.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-04-large.png'
          }
        ]
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };
    const takingData = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: []
      }
    };
    it('Удаление ингредиента', () => {
      const state = constructorSlice(initialState, removeIngredient('myIng'));
      const recived = state.constructorItems.ingredients;
      const taking = takingData.constructorItems.ingredients;

      expect(taking).toEqual(recived);
    });
  });

  describe('Тестирование экшенов перемещения', () => {
    const initialState = {
      constructorItems: {
        bun: {
          id: 'myBun',
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
        },
        ingredients: [
          {
            id: 'myIng',
            _id: '643d69a5c3f7b9001cfa0940',
            name: 'Говяжий метеорит (отбивная)',
            type: 'main',
            proteins: 800,
            fat: 800,
            carbohydrates: 300,
            calories: 2674,
            price: 3000,
            image: 'https://code.s3.yandex.net/react/code/meat-04.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-04-large.png'
          },
          {
            id: 'myIng2',
            _id: '643d69a5c3f7b9001cfa0949',
            name: 'Мини-салат Экзо-Плантаго',
            type: 'main',
            proteins: 1,
            fat: 2,
            carbohydrates: 3,
            calories: 6,
            price: 4400,
            image: 'https://code.s3.yandex.net/react/code/salad.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/salad-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/salad-large.png'
          },
          {
            id: 'myIng3',
            _id: '643d69a5c3f7b9001cfa0944',
            name: 'Соус традиционный галактический',
            type: 'sauce',
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-03-large.png'
          }
        ]
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };
    const dataResult = {
      ...initialState,
      constructorItems: {
        bun: {
          id: 'myBun',
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
        },
        ingredients: [
          {
            id: 'myIng',
            _id: '643d69a5c3f7b9001cfa0940',
            name: 'Говяжий метеорит (отбивная)',
            type: 'main',
            proteins: 800,
            fat: 800,
            carbohydrates: 300,
            calories: 2674,
            price: 3000,
            image: 'https://code.s3.yandex.net/react/code/meat-04.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-04-large.png'
          },
          {
            id: 'myIng3',
            _id: '643d69a5c3f7b9001cfa0944',
            name: 'Соус традиционный галактический',
            type: 'sauce',
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-03-large.png'
          },
          {
            id: 'myIng2',
            _id: '643d69a5c3f7b9001cfa0949',
            name: 'Мини-салат Экзо-Плантаго',
            type: 'main',
            proteins: 1,
            fat: 2,
            carbohydrates: 3,
            calories: 6,
            price: 4400,
            image: 'https://code.s3.yandex.net/react/code/salad.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/salad-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/salad-large.png'
          }
        ]
      }
    };
    it('перемещение ингредиента на позицию выше', () => {
      const state = constructorSlice(initialState, moveIngredientUp(2));
      const taked = dataResult.constructorItems.ingredients;
      const recived = state.constructorItems.ingredients;

      expect(taked).toEqual(recived);
    });
    it('перемещение ингредиента на позицию ниже', () => {
      const state = constructorSlice(initialState, moveIngredientDown(1));
      const taked = dataResult.constructorItems.ingredients;
      const recived = state.constructorItems.ingredients;

      expect(taked).toEqual(recived);
    });
  });

  describe('Тестирование ассинхроннгого экшена orderBurger', () => {
    const actions = {
      pending: {
        type: orderBurger.pending.type,
        payload: null
      },
      rejected: {
        type: orderBurger.rejected.type,
        error: { message: 'SomeError' }
      },
      fulfilled: {
        type: orderBurger.fulfilled.type,
        payload: {
          message: { number: 1175 },
          constructorItems: {
            bun: null,
            ingredients: []
          },
          order: {
            id: 'order',
            status: 'done',
            createdAt: '2024-08-02T23:28:59.574Z',
            updatedAt: '2024-08-02T23:29:00.164Z',
            number: 1175,
            ingredients: ['ing', 'ing2']
          }
        }
      }
    };
    it('тест синхронного экшена orderBurger.pending', () => {
      const state = constructorSlice(initialState, actions.pending);
      expect(state.loading).toBe(true);
      expect(state.orderRequest).toBe(true);
      expect(state.error).toBeNull;
    });
    it('тест синхронного экшена orderBurger.rejected', () => {
      const state = constructorSlice(initialState, actions.rejected);
      expect(state.loading).toBe(false);
      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
    });
    it('тест синхронного экшена orderBurger.fulfilled', () => {
      const state = constructorSlice(initialState, actions.fulfilled);
      expect(state.loading).toBe(false);
      expect(state.orderRequest).toBe(false);
      expect(state.error).toBeNull;
      expect(state.orderModalData).toBe(actions.fulfilled.payload.order);
      expect(state.constructorItems).toStrictEqual(
        actions.fulfilled.payload.constructorItems
      );
    });
  });
});
