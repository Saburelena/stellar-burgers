import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import styles from './constructor-page.module.css';
import { BurgerIngredients, BurgerConstructor } from '../../components';
import { Modal } from '../../components/modal';
import { OrderDetails } from '../../components/order-details';
import { getIngredientsApi, getIngredientsApiLoading } from '@selectors';
import { fetchIngredients } from '@slices/ingredientsSlice';
import { clearOrder } from '@slices/orderSlice';
import { clearConstructor } from '@slices/constructorSlice';

export const ConstructorPage: FC = () => {
  const dispatch = useAppDispatch();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const isIngredientsLoading = useAppSelector(getIngredientsApiLoading);
  const ingredients = useAppSelector(getIngredientsApi);

  useEffect(() => {
    if (!ingredients.length && !isIngredientsLoading) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length, isIngredientsLoading]);

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
    dispatch(clearOrder());
    dispatch(clearConstructor());
  };

  const handleOrderSuccess = () => {
    setIsOrderModalOpen(true);
    dispatch(clearConstructor());
  };

  return (
    <>
      <main className={styles.containerMain}>
        <h1
          className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
        >
          Соберите бургер
        </h1>
        <div className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients />
          <BurgerConstructor onOrderSuccess={handleOrderSuccess} />
        </div>
      </main>

      {isOrderModalOpen && (
        <Modal title='Детали заказа' onClose={handleCloseOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};
