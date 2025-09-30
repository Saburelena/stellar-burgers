import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { RefreshButton } from '@zlden/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { TIngredient, TOrder } from '@utils-types';
import { getOrderByNumberApi } from '../../utils/burger-api';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';

type TIngredientsWithCount = {
  [key: string]: TIngredient & { count: number };
};

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const orderNumber = number ? Number(number) : null;
  const dispatch = useAppDispatch();

  const ingredients = useAppSelector((state) => state.ingredients.items);
  const feedOrders = useAppSelector((state) => state.feed.orders);
  const profileOrders = useAppSelector((state) => state.profileOrders.orders);

  const [orderData, setOrderData] = useState<TOrder | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [ingredients.length, dispatch]);

  useEffect(() => {
    const fromStore = [...feedOrders, ...profileOrders].find(
      (order) => order.number === orderNumber
    );
    if (fromStore) {
      setOrderData(fromStore);
    }
  }, [feedOrders, profileOrders, orderNumber]);

  useEffect(() => {
    if (!orderData && orderNumber) {
      setIsLoading(true);
      getOrderByNumberApi(orderNumber)
        .then((res) => {
          const fetched = res.orders?.[0];
          if (fetched) {
            setOrderData(fetched);
            setLoadError(null);
          } else {
            setLoadError('Информация о заказе не найдена');
          }
        })
        .catch(() => setLoadError('Информация о заказе не найдена'))
        .finally(() => setIsLoading(false));
    }
  }, [orderData, orderNumber]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {} as TIngredientsWithCount
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!orderInfo) {
    return (
      <div
        className='text text_type_main-default pt-20 pb-20'
        style={{ textAlign: 'center' }}
      >
        <p className='mb-6'>{loadError || 'Информация о заказе не найдена'}</p>
        <RefreshButton
          text='Обновить'
          onClick={() => window.location.reload()}
        />
      </div>
    );
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
