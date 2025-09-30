import { TOrder } from '@utils-types';

export type FeedUIProps = {
  orders: TOrder[];
  handleGetFeeds: () => void;
  showFallback: boolean;
  fallbackMessage: string;
  canRetry: boolean;
};
