import { FC, useMemo } from 'react';
import { FeedInfoUI } from '../ui/feed-info';
import { useAppSelector } from '../../services/store';

const MAX_ORDER_NUMBERS = 20;

export const FeedInfo: FC = () => {
  const { orders, total, totalToday } = useAppSelector((state) => state.feed);

  const readyOrders = useMemo(
    () =>
      orders
        .filter((order) => order.status === 'done')
        .map((order) => order.number)
        .slice(0, MAX_ORDER_NUMBERS),
    [orders]
  );

  const pendingOrders = useMemo(
    () =>
      orders
        .filter((order) => order.status === 'pending')
        .map((order) => order.number)
        .slice(0, MAX_ORDER_NUMBERS),
    [orders]
  );

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total, totalToday }}
    />
  );
};
