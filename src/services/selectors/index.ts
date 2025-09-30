// src/services/selectors/index.ts
import { RootState } from '../store';
import { TIngredient } from '@utils-types';

// Селекторы для ингредиентов
export const getIngredientsApi = (state: RootState) => state.ingredients.items;
export const getIngredientsApiLoading = (state: RootState) =>
  state.ingredients.isLoading;
export const getIngredientsApiError = (state: RootState) =>
  state.ingredients.error;

// Селекторы для конструктора
export const getConstructorItems = (state: RootState) =>
  state.constructorBurger.ingredients;
export const getConstructorBun = (state: RootState) =>
  state.constructorBurger.bun;
export const getTotalPrice = (state: RootState) => {
  const bunPrice = state.constructorBurger.bun
    ? state.constructorBurger.bun.price * 2
    : 0;

  const ingredientsPrice = state.constructorBurger.ingredients.reduce(
    (sum: number, item: TIngredient) => sum + item.price,
    0
  );

  return bunPrice + ingredientsPrice;
};
