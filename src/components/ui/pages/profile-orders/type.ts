import { TOrder } from '@utils-types';

export type ProfileOrdersUIProps = {
  orders: TOrder[];
  showFallback: boolean;
  fallbackMessage: string;
  canRetry: boolean;
  onReconnect: () => void;
};
