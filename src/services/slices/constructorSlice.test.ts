import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  ConstructorState
} from './constructorSlice';
import { TIngredient } from '@utils-types';

describe('constructorSlice', () => {
  const bun: TIngredient = {
    _id: 'bun-id',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 200,
    price: 100,
    image: 'bun.png',
    image_large: 'bun_large.png',
    image_mobile: 'bun_mobile.png'
  };

  const sauce: TIngredient = {
    _id: 'sauce-id',
    name: 'Соус',
    type: 'sauce',
    proteins: 5,
    fat: 3,
    carbohydrates: 10,
    calories: 50,
    price: 20,
    image: 'sauce.png',
    image_large: 'sauce_large.png',
    image_mobile: 'sauce_mobile.png'
  };

  const initialState: ConstructorState = {
    bun: null,
    ingredients: []
  };

  it('should handle addIngredient for bun', () => {
    const action = addIngredient(bun);
    const state = reducer(initialState, action);
    expect(state.bun).toMatchObject({ ...bun, id: expect.any(String) });
    expect(state.ingredients).toHaveLength(0);
  });

  it('should handle addIngredient for fillings', () => {
    const action = addIngredient(sauce);
    const state = reducer(initialState, action);
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject({ ...sauce, id: expect.any(String) });
  });

  it('should handle removeIngredient', () => {
    const action = addIngredient(sauce);
    const stateWithIngredient = reducer(initialState, action);
    const state = reducer(stateWithIngredient, removeIngredient(action.payload.id));
    expect(state.ingredients).toHaveLength(0);
  });

  it('should handle moveIngredient', () => {
    const firstAction = addIngredient(sauce);
    const secondAction = addIngredient({ ...sauce, _id: 'sauce-2' });

    let state = reducer(initialState, firstAction);
    state = reducer(state, secondAction);

    const reordered = reducer(state, moveIngredient({ from: 0, to: 1 }));

    expect(reordered.ingredients[0]).toEqual(secondAction.payload);
    expect(reordered.ingredients[1]).toEqual(firstAction.payload);
  });

  it('should handle clearConstructor', () => {
    const bunAction = addIngredient(bun);
    const sauceAction = addIngredient(sauce);
    let state = reducer(initialState, bunAction);
    state = reducer(state, sauceAction);
    const cleared = reducer(state, clearConstructor());
    expect(cleared).toEqual(initialState);
  });
});
