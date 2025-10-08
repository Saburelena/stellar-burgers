import reducer, { orderBurgerApi, clearOrder, initialState } from './orderSlice';

describe('orderSlice', () => {
  const createState = () => ({ ...initialState });

  it('should handle orderBurgerApi.pending', () => {
    const state = reducer(createState(), orderBurgerApi.pending('request-id', []));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle orderBurgerApi.fulfilled', () => {
    const orderNumber = 1234;
    const state = reducer(
      { ...createState(), isLoading: true },
      orderBurgerApi.fulfilled(orderNumber, 'request-id', [])
    );
    expect(state.isLoading).toBe(false);
    expect(state.orderNumber).toBe(orderNumber);
    expect(state.error).toBeNull();
  });

  it('should handle orderBurgerApi.rejected', () => {
    const errorMessage = 'Ошибка заказа';
    const state = reducer(
      { ...createState(), isLoading: true },
      orderBurgerApi.rejected(null, 'request-id', [], errorMessage)
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('should handle clearOrder', () => {
    const state = reducer(
      { ...createState(), orderNumber: 42, error: 'Ошибка' },
      clearOrder()
    );
    expect(state.orderNumber).toBeNull();
    expect(state.error).toBeNull();
  });
});
