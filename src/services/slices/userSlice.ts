import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  forgotPasswordApi,
  updateUserApi,
  TLoginData,
  TRegisterData
} from '../../utils/burger-api';
import { TUser } from '../../utils/types';

export interface IUserState {
  user: TUser | null;
  isAuth: boolean;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
  resetRequested: boolean;
}

const handleAuthSuccess = (
  user: TUser,
  accessToken: string,
  refreshToken: string
) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  return user;
};

const initialState: IUserState = {
  user: null,
  isAuth: false,
  isAuthChecked: false,
  isLoading: false,
  error: null,
  resetRequested: false
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);
      handleAuthSuccess(
        response.user,
        response.accessToken,
        response.refreshToken
      );
      return response.user;
    } catch {
      return rejectWithValue('Не удалось зарегистрироваться');
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      handleAuthSuccess(
        response.user,
        response.accessToken,
        response.refreshToken
      );
      return response.user;
    } catch {
      return rejectWithValue('Не удалось авторизоваться');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      return true;
    } catch {
      return rejectWithValue('Не удалось выйти из системы');
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch {
      return rejectWithValue('Не удалось получить данные пользователя');
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(user);
      return response.user;
    } catch {
      return rejectWithValue('Не удалось обновить данные пользователя');
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      await forgotPasswordApi({ email });
      return true;
    } catch {
      return rejectWithValue('Не удалось отправить письмо');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }, { rejectWithValue }) => {
    try {
      await resetPasswordApi(data);
      return true;
    } catch {
      return rejectWithValue('Не удалось сбросить пароль');
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }) => {
    const hasRefreshToken = localStorage.getItem('refreshToken');
    const hasAccessToken = getCookie('accessToken');

    if (!hasRefreshToken && !hasAccessToken) {
      return null;
    }

    try {
      const response = await dispatch(getUser()).unwrap();
      return response;
    } catch {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      return null;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetAuthError: (state) => {
      state.error = null;
    },
    setResetRequested: (state, action) => {
      state.resetRequested = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthChecked = true;
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.resetRequested = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.resetRequested = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(checkUserAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        if (action.payload) {
          state.user = action.payload;
          state.isAuth = true;
        } else {
          state.user = null;
          state.isAuth = false;
        }
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.user = null;
        state.isAuth = false;
      });
  }
});

export const { resetAuthError, setResetRequested } = userSlice.actions;

export default userSlice.reducer;
