import { FC } from 'react';
import { useAppSelector } from '../../services/store';
import {
  selectOrderError,
  selectOrderIsLoading,
  selectOrderNumber
} from '@selectors';
import { OrderDetailsUI, Preloader } from '@ui';

export const OrderDetails: FC = () => {
  const orderNumber = useAppSelector(selectOrderNumber);
  const isLoading = useAppSelector(selectOrderIsLoading);
  const error = useAppSelector(selectOrderError);

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
