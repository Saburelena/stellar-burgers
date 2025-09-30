import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApiApi } from '../../utils/burger-api';
import { TIngredient } from '@utils-types';

export interface IngredientsState {
  items: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  items: [],
  isLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getIngredientsApiApi();
      return response;
    } catch {
      return rejectWithValue('Не удалось загрузить ингредиенты');
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.items = [];
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.items = [];
      });
  }
});

export default ingredientsSlice.reducer;
