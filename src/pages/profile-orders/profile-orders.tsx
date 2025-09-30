import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';
import { FC, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { profileOrdersWsActions } from '../../services/slices/profileOrdersSlice';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, isConnected, error } = useAppSelector(
    (state) => state.profileOrders
  );
  const {
    items: ingredientItems,
    error: ingredientsError,
    isLoading: ingredientsLoading
  } = useAppSelector((state) => state.ingredients);
  const hasIngredients = ingredientItems.length > 0;

  useEffect(() => {
    dispatch({ type: profileOrdersWsActions.connect });
    return () => {
      dispatch({ type: profileOrdersWsActions.disconnect });
    };
  }, [dispatch]);

  useEffect(() => {
    if (!hasIngredients && !ingredientsLoading && !ingredientsError) {
      dispatch(fetchIngredients());
    }
  }, [hasIngredients, ingredientsLoading, ingredientsError, dispatch]);

  const handleReconnect = useCallback(() => {
    dispatch({ type: profileOrdersWsActions.disconnect });
    dispatch({ type: profileOrdersWsActions.connect });
    dispatch(fetchIngredients());
  }, [dispatch]);

  const isInitialLoading = ingredientsLoading && !hasIngredients;

  if (isInitialLoading) {
    return <Preloader />;
  }

  const showFallback =
    !hasIngredients ||
    !orders.length ||
    !!error ||
    !!ingredientsError ||
    !isConnected;

  const fallbackMessage =
    error || ingredientsError || !isConnected
      ? 'Нет связи с сервером'
      : 'Вы ещё не сделали заказ';

  const canRetry = Boolean(error || ingredientsError || !isConnected);

  return (
    <ProfileOrdersUI
      orders={showFallback ? [] : orders}
      showFallback={showFallback}
      fallbackMessage={fallbackMessage}
      canRetry={canRetry}
      onReconnect={handleReconnect}
    />
  );
};
