export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

export type TConstructorIngredient = TIngredient & {
  id: string;
};

export type TOrderStatus = 'created' | 'pending' | 'done';

export const ORDER_STATUS_TRANSLATE: Record<TOrderStatus, string> = {
  created: 'Создан',
  pending: 'Готовится',
  done: 'Выполнен'
};

export type TOrder = {
  _id: string;
  number: number;
  status: TOrderStatus;
  name: string;
  createdAt: string;
  updatedAt: string;
  ingredients: string[];
};

export type TUser = {
  email: string;
  name: string;
};

export type TTabMode = 'bun' | 'sauce' | 'main';
