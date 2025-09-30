import { RootState } from '../store';
import { TIngredient } from '@utils-types';

export const getIngredientsApi = (state: RootState) => state.ingredients.items;
export const getIngredientsApiLoading = (state: RootState) =>
  state.ingredients.isLoading;
export const getIngredientsApiError = (state: RootState) =>
  state.ingredients.error;

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
export const selectOrderNumber = (state: RootState) => state.order.orderNumber;
export const selectOrderIsLoading = (state: RootState) => state.order.isLoading;
export const selectOrderError = (state: RootState) => state.order.error;

export const selectUser = (state: RootState) => state.user.user;
export const selectIsAuth = (state: RootState) => state.user.isAuth;
export const selectUserName = (state: RootState) => state.user.user?.name;
