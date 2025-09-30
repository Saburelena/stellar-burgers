import { FC } from 'react';
import { useAppSelector } from '../../services/store';
import { OrderDetailsUI, Preloader } from '@ui';

export const OrderDetails: FC = () => {
  const { orderNumber, isLoading, error } = useAppSelector(
    (state) => state.order
  );

  if (isLoading) {
    return (
      <div className='pt-10 pb-10 pr-10 pl-10'>
        <Preloader />
        <p className='text text_type_main-default mt-4'>Оформляем заказ…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='pt-10 pb-10 pr-10 pl-10'>
        <p className='text text_type_main-default text_color_error mb-6'>
          {error}
        </p>
        <p className='text text_type_main-default'>Попробуйте ещё раз.</p>
      </div>
    );
  }

  if (!orderNumber) {
    return (
      <div className='pt-10 pb-10 pr-10 pl-10'>
        <Preloader />
      </div>
    );
  }

  return <OrderDetailsUI orderNumber={orderNumber} />;
};
