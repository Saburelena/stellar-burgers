import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { selectUserName } from '../../services/selectors';
import { useAppSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useAppSelector(selectUserName);
  return <AppHeaderUI userName={userName} />;
};
