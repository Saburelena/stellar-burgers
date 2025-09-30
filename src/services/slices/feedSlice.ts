import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isConnected: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isConnected: false,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    connect(state) {
      state.error = null;
    },
    disconnect(state) {
      state.isConnected = false;
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
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
      state.total = 0;
      state.totalToday = 0;
    },
    wsMessage(
      state,
      action: PayloadAction<{
        orders: TOrder[];
        total: number;
        totalToday: number;
      }>
    ) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  }
});

export const feedReducer = feedSlice.reducer;
export const feedActions = feedSlice.actions;

const API_URL =
  process.env.REACT_APP_BURGER_API_URL ??
  process.env.BURGER_API_URL ??
  'https://norma.nomoreparties.space/api';
const FEED_WS_URL =
  process.env.REACT_APP_BURGER_FEED_WS_URL ??
  process.env.BURGER_FEED_WS_URL ??
  `${API_URL.replace(/^http/i, 'ws').replace(/\/api\/?$/i, '')}/orders/all`;

export const feedWsActions = {
  connect: feedActions.connect.type,
  disconnect: feedActions.disconnect.type,
  onOpen: feedActions.wsOpen.type,
  onClose: feedActions.wsClose.type,
  onError: feedActions.wsError.type,
  onMessage: feedActions.wsMessage.type,
  wsUrl: FEED_WS_URL
};
