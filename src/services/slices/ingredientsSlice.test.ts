import reducer, { fetchIngredients, initialState } from './ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice', () => {
  const createState = () => ({
    ...initialState,
    items: [...initialState.items]
  });

  const ingredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Булка 1',
      type: 'bun',
      proteins: 20,
      fat: 10,
      carbohydrates: 30,
      calories: 200,
      price: 100,
      image: 'bun-1.png',
      image_large: 'bun-1-large.png',
      image_mobile: 'bun-1-mobile.png'
    },
    {
      _id: '2',
      name: 'Начинка 1',
      type: 'main',
      proteins: 15,
      fat: 5,
      carbohydrates: 25,
      calories: 150,
      price: 80,
      image: 'main-1.png',
      image_large: 'main-1-large.png',
      image_mobile: 'main-1-mobile.png'
    }
  ];

  it('should handle fetchIngredients.pending', () => {
    const state = reducer(createState(), fetchIngredients.pending('request-id', undefined));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.items).toEqual([]);
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const state = reducer(
      { ...createState(), isLoading: true },
      fetchIngredients.fulfilled(ingredients, 'request-id', undefined)
    );
    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(ingredients);
    expect(state.error).toBeNull();
  });

  it('should handle fetchIngredients.rejected', () => {
    const errorMessage = 'Ошибка';
    const state = reducer(
      { ...createState(), isLoading: true },
      fetchIngredients.rejected(null, 'request-id', undefined, errorMessage)
    );
    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual([]);
    expect(state.error).toBe(errorMessage);
  });
});
