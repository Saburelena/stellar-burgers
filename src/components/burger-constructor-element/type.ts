import { TConstructorIngredient } from '@utils-types';

export type BurgerConstructorElementProps = {
  ingredient: TConstructorIngredient;
  index: number;
  totalItems: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  onDelete: (id: string) => void;
};
