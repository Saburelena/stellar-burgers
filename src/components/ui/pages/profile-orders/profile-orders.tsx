import { FC } from 'react';

import styles from './profile-orders.module.css';

import { ProfileOrdersUIProps } from './type';
import { ProfileMenu, OrdersList } from '@components';
import { RefreshButton } from '@zlden/react-developer-burger-ui-components';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({
  orders,
  showFallback,
  fallbackMessage,
  canRetry,
  onReconnect
}) => (
  <main className={`${styles.main}`}>
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu />
    </div>
    <div className={`mt-10 ${styles.orders}`}>
      {showFallback ? (
        <div className={`${styles.fallback} text text_type_main-default`}>
          <p className='mb-6'>{fallbackMessage}</p>
          {canRetry && <RefreshButton text='Обновить' onClick={onReconnect} />}
        </div>
      ) : (
        <OrdersList orders={orders} />
      )}
    </div>
  </main>
);
