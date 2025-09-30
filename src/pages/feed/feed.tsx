import { FC, useEffect } from 'react';
import { FeedUI } from '@ui-pages';
import { Preloader } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { feedWsActions } from '../../services/slices/feedSlice';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const {
    orders,
    isConnected,
    error: feedError
  } = useAppSelector((state) => state.feed);
  const {
    items: ingredientItems,
    error: ingredientsError,
    isLoading: ingredientsLoading
  } = useAppSelector((state) => state.ingredients);
  const hasIngredients = ingredientItems.length > 0;

  useEffect(() => {
    if (!hasIngredients && !ingredientsLoading && !ingredientsError) {
      dispatch(fetchIngredients());
    }
  }, [hasIngredients, ingredientsLoading, ingredientsError, dispatch]);

  useEffect(() => {
    dispatch({ type: feedWsActions.connect });
    return () => {
      dispatch({ type: feedWsActions.disconnect });
    };
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch({ type: feedWsActions.disconnect });
    dispatch({ type: feedWsActions.connect });
    dispatch(fetchIngredients());
  };

  const isInitialLoading =
    (ingredientsLoading && !hasIngredients) ||
    (!orders.length && !isConnected && !feedError && !ingredientsError);

  if (isInitialLoading) {
    return <Preloader />;
  }

  const showFallback =
    !hasIngredients ||
    !orders.length ||
    !!feedError ||
    !!ingredientsError ||
    !isConnected;

  const fallbackMessage =
    feedError || ingredientsError || !isConnected
      ? 'Нет связи с сервером'
      : 'Заказы пока не получены';

  const canRetry = Boolean(feedError || ingredientsError || !isConnected);

  return (
    <FeedUI
      orders={
        showFallback && (!hasIngredients || !!feedError || !!ingredientsError)
          ? []
          : orders
      }
      handleGetFeeds={handleGetFeeds}
      showFallback={showFallback}
      fallbackMessage={fallbackMessage}
      canRetry={canRetry}
    />
  );
};
