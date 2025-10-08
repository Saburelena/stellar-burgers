import { feedReducer, feedActions, initialState, TFeedState } from './feedSlice';
import { TOrder } from '@utils-types';

describe('feedSlice', () => {
  const createState = (state: Partial<TFeedState> = {}) => ({
    ...initialState,
    ...state
  });

  const orders: TOrder[] = [
    {
      _id: '1',
      ingredients: ['1', '2'],
      status: 'pending',
      name: 'Order 1',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      number: 111
    }
  ];

  it('should handle connect', () => {
    const state = feedReducer(createState({ error: 'Ошибка' }), feedActions.connect());
    expect(state.error).toBeNull();
    expect(state.orders).toEqual([]);
  });

  it('should handle disconnect', () => {
    const state = feedReducer(
      createState({
        isConnected: true,
        orders,
        total: 10,
        totalToday: 5
      }),
      feedActions.disconnect()
    );

    expect(state.isConnected).toBe(false);
    expect(state.orders).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.totalToday).toBe(0);
  });

  it('should handle wsOpen', () => {
    const state = feedReducer(createState({ error: 'Ошибка' }), feedActions.wsOpen());
    expect(state.isConnected).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle wsClose', () => {
    const state = feedReducer(
      createState({ isConnected: true, orders }),
      feedActions.wsClose()
    );
    expect(state.isConnected).toBe(false);
    expect(state.orders).toEqual([]);
  });

  it('should handle wsError', () => {
    const error = 'Error message';
    const state = feedReducer(
      createState({ orders, total: 10, totalToday: 5 }),
      feedActions.wsError(error)
    );

    expect(state.error).toBe(error);
    expect(state.orders).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.totalToday).toBe(0);
  });

  it('should handle wsMessage', () => {
    const payload = {
      orders,
      total: 20,
      totalToday: 8
    };
    const state = feedReducer(createState(), feedActions.wsMessage(payload));

    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(payload.total);
    expect(state.totalToday).toBe(payload.totalToday);
  });
});
