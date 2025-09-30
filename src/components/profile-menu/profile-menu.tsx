import { FC, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { logoutUser } from '@slices/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.user);

  const handleLogout = useCallback(() => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate('/login', { replace: true });
      });
  }, [dispatch, navigate]);

  return (
    <ProfileMenuUI
      handleLogout={handleLogout}
      pathname={pathname}
      isLoading={isLoading}
    />
  );
};
