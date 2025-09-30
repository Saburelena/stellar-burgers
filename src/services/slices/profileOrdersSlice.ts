import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TProfileOrdersState = {
  orders: TOrder[];
  isConnected: boolean;
  error: string | null;
};

const initialState: TProfileOrdersState = {
  orders: [],
  isConnected: false,
  error: null
};

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {
    connect(state) {
      state.error = null;
    },
    disconnect(state) {
      state.isConnected = false;
      state.orders = [];
    },
    wsOpen(state) {
      state.isConnected = true;
      state.error = null;
    },
    wsClose(state) {
      state.isConnected = false;
      state.orders = [];
    },
    wsError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.orders = [];
    },
    wsMessage(state, action: PayloadAction<{ orders: TOrder[] }>) {
      state.orders = action.payload.orders;
    }
  }
});

export const profileOrdersReducer = profileOrdersSlice.reducer;
export const profileOrdersActions = profileOrdersSlice.actions;

const API_URL =
  process.env.BURGER_API_URL ?? 'https://norma.nomoreparties.space/api';
const PROFILE_WS_URL =
  process.env.BURGER_PROFILE_WS_URL ??
  `${API_URL.replace(/^http/i, 'ws').replace(/\/api\/?$/i, '')}/orders`;

export const profileOrdersWsActions = {
  connect: profileOrdersActions.connect.type,
  disconnect: profileOrdersActions.disconnect.type,
  onOpen: profileOrdersActions.wsOpen.type,
  onClose: profileOrdersActions.wsClose.type,
  onError: profileOrdersActions.wsError.type,
  onMessage: profileOrdersActions.wsMessage.type,
  wsUrl: PROFILE_WS_URL,
  withAuth: true
};
