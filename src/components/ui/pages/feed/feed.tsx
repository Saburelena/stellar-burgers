import { FC, memo } from 'react';

import styles from './feed.module.css';

import { FeedUIProps } from './type';
import { OrdersList, FeedInfo } from '@components';
import { RefreshButton } from '@zlden/react-developer-burger-ui-components';

export const FeedUI: FC<FeedUIProps> = memo(
  ({ orders, handleGetFeeds, showFallback, fallbackMessage, canRetry }) => (
    <main className={styles.containerMain}>
      <div className={`${styles.titleBox} mt-10 mb-5`}>
        <h1 className={`${styles.title} text text_type_main-large`}>
          Лента заказов
        </h1>
        <RefreshButton text='Обновить' onClick={handleGetFeeds} />
      </div>
      <div className={styles.main}>
        <div className={styles.columnOrders}>
          {showFallback ? (
            <div className={`${styles.fallback} text text_type_main-default`}>
              <p className='mb-6'>{fallbackMessage}</p>
              {canRetry && (
                <RefreshButton
                  text='Попробовать снова'
                  onClick={handleGetFeeds}
                />
              )}
            </div>
          ) : (
            <OrdersList orders={orders} />
          )}
        </div>
        <div className={styles.columnInfo}>
          <FeedInfo />
        </div>
      </div>
    </main>
  )
);
