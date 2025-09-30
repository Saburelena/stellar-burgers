import { ConnectDropTarget } from 'react-dnd';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  price: number;
  onOrderClick: () => void;
  onDeleteClick: (id: string) => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  dropTargetRef: ConnectDropTarget;
  error: string | null;
};
