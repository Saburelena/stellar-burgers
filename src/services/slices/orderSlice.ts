import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi as orderBurgerApiApi } from '../../utils/burger-api';

export interface OrderState {
  orderNumber: number | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orderNumber: null,
  isLoading: false,
  error: null
};

export const orderBurgerApi = createAsyncThunk(
  'order/create',
  async (ingredientIds: string[], { rejectWithValue }) => {
    try {
      const response = await orderBurgerApiApi(ingredientIds);
      return response.order.number;
    } catch {
      return rejectWithValue('Не удалось оформить заказ');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderNumber = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurgerApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(orderBurgerApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderNumber = action.payload;
      })
      .addCase(orderBurgerApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
