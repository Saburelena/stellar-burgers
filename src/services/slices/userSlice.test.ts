import reducer, {
  initialState,
  resetAuthError,
  setResetRequested,
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  forgotPassword,
  resetPassword,
  checkUserAuth,
  IUserState
} from './userSlice';
import { TUser } from '@utils-types';

describe('userSlice', () => {
  const user: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  const createState = (state: Partial<IUserState> = {}) => ({
    ...initialState,
    ...state
  });

  it('should handle registerUser.pending', () => {
    const state = reducer(createState({ error: 'Ошибка' }), registerUser.pending('id', {
      email: 'test@example.com',
      password: '123456',
      name: 'Test User'
    }));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle loginUser.fulfilled', () => {
    const state = reducer(
      createState({ isLoading: true }),
      loginUser.fulfilled(user, 'id', {
        email: user.email,
        password: '123456'
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.isAuth).toBe(true);
  });

  it('should handle logoutUser.fulfilled', () => {
    const state = reducer(createState({ user, isAuth: true }), logoutUser.fulfilled(true, 'id', undefined));

    expect(state.user).toBeNull();
    expect(state.isAuth).toBe(false);
  });

  it('should handle getUser.rejected', () => {
    const error = 'Не удалось получить данные пользователя';
    const state = reducer(
      createState({ isLoading: true }),
      getUser.rejected(new Error(error), 'id', undefined, error)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
    expect(state.isAuthChecked).toBe(true);
  });

  it('should handle updateUser.fulfilled', () => {
    const updatedUser = { ...user, name: 'Updated Name' };
    const state = reducer(
      createState({ isLoading: true, user }),
      updateUser.fulfilled(updatedUser, 'id', { name: 'Updated Name' })
    );

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(updatedUser);
  });

  it('should handle forgotPassword.fulfilled', () => {
    const state = reducer(
      createState({ isLoading: true }),
      forgotPassword.fulfilled(true, 'id', user.email)
    );

    expect(state.isLoading).toBe(false);
    expect(state.resetRequested).toBe(true);
  });

  it('should handle resetPassword.fulfilled', () => {
    const state = reducer(
      createState({ isLoading: true, resetRequested: true }),
      resetPassword.fulfilled(true, 'id', { password: 'newpass', token: 'token' })
    );

    expect(state.isLoading).toBe(false);
    expect(state.resetRequested).toBe(false);
  });

  it('should handle checkUserAuth.fulfilled with user', () => {
    const state = reducer(createState({ isLoading: true }), checkUserAuth.fulfilled(user, 'id', undefined));

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.isAuth).toBe(true);
    expect(state.isAuthChecked).toBe(true);
  });

  it('should handle checkUserAuth.fulfilled without user', () => {
    const state = reducer(createState({ isLoading: true, user }), checkUserAuth.fulfilled(null, 'id', undefined));

    expect(state.isLoading).toBe(false);
    expect(state.user).toBeNull();
    expect(state.isAuth).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });

  it('should reset auth error', () => {
    const state = reducer(createState({ error: 'Ошибка' }), resetAuthError());
    expect(state.error).toBeNull();
  });

  it('should set resetRequested flag', () => {
    const state = reducer(createState(), setResetRequested(true));
    expect(state.resetRequested).toBe(true);
  });
});
