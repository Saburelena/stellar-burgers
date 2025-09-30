import { FC, SyntheticEvent, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { ResetPasswordUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { resetPassword, resetAuthError } from '@slices/userSlice';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, isLoading, resetRequested } = useAppSelector(
    (state) => state.user
  );
  const isFirstRender = useRef(true);

  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetPassword({ password, token }))
      .unwrap()
      .then(() => {
        navigate('/login', { replace: true });
      });
  };

  useEffect(() => {
    if (!resetRequested && isFirstRender.current) {
      navigate('/forgot-password', { replace: true });
    }
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, [resetRequested, navigate]);

  useEffect(() => {
    if (error) {
      dispatch(resetAuthError());
    }
  }, [password, token, dispatch, error]);

  return (
    <ResetPasswordUI
      errorText={error || ''}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};
