import { FC, useState, SyntheticEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ForgotPasswordUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { forgotPassword, resetAuthError } from '@slices/userSlice';

export const ForgotPassword: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, isLoading, resetRequested } = useAppSelector(
    (state) => state.user
  );

  const [email, setEmail] = useState('');

  useEffect(() => {
    if (resetRequested) {
      navigate('/reset-password', { replace: true });
    }
  }, [resetRequested, navigate]);

  useEffect(() => {
    if (error) {
      dispatch(resetAuthError());
    }
  }, [email, dispatch, error]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <ForgotPasswordUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};
