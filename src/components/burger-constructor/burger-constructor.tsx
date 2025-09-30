// src/components/burger-constructor/burger-constructor.tsx
import { FC, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  getConstructorBun,
  getConstructorItems,
  getTotalPrice
} from '@selectors';
import {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '@slices/constructorSlice';
import { orderBurgerApi } from '@slices/orderSlice';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

type BurgerConstructorProps = {
  onOrderSuccess?: () => void;
};

export const BurgerConstructor: FC<BurgerConstructorProps> = ({
  onOrderSuccess
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const ingredients = useAppSelector(getConstructorItems);
  const bun = useAppSelector(getConstructorBun);
  const totalPrice = useAppSelector(getTotalPrice);
  const { isAuth } = useAppSelector((state) => state.user);
  const { isLoading: orderRequest, error: orderError } = useAppSelector(
    (state) => state.order
  );

  const [, dropTarget] = useDrop<TIngredient>({
    accept: 'ingredient',
    drop(item) {
      dispatch(addIngredient(item));
    }
  });

  const handleDelete = (uuid: string) => {
    dispatch(removeIngredient(uuid));
  };

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(moveIngredient({ from: dragIndex, to: hoverIndex }));
    },
    [dispatch]
  );

  const onOrderClick = () => {
    if (!isAuth) {
      navigate('/login', {
        replace: true,
        state: {
          from: {
            ...location,
            background: location.state?.background,
            state: null
          }
        }
      });
      return;
    }

    if (!bun) {
      return;
    }

    const ingredientIds = [
      bun._id,
      ...ingredients.map(
        (ingredient: TConstructorIngredient) => ingredient._id
      ),
      bun._id
    ];

    onOrderSuccess?.();

    dispatch(orderBurgerApi(ingredientIds))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      })
      .catch((error) => {
        console.error('Ошибка при создании заказа:', error);
      });
  };

  return (
    <BurgerConstructorUI
      constructorItems={{ bun, ingredients }}
      orderRequest={orderRequest}
      price={totalPrice}
      onOrderClick={onOrderClick}
      onDeleteClick={handleDelete}
      moveCard={moveCard}
      dropTargetRef={dropTarget}
      error={orderError}
    />
  );
};
