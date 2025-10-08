import {
  profileOrdersReducer,
  profileOrdersActions,
  initialState,
  TProfileOrdersState
} from './profileOrdersSlice';
import { TOrder } from '@utils-types';

describe('profileOrdersSlice', () => {
  const createState = (state: Partial<TProfileOrdersState> = {}) => ({
    ...initialState,
    ...state
  });

  const orders: TOrder[] = [
    {
      _id: 'order-1',
      ingredients: ['1', '2'],
      status: 'done',
      name: 'Order 1',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      number: 101
    }
  ];

  it('should handle connect', () => {
    const state = profileOrdersReducer(
      createState({ error: 'Ошибка', orders }),
      profileOrdersActions.connect()
    );

    expect(state.error).toBeNull();
    expect(state.orders).toEqual(orders);
  });

  it('should handle disconnect', () => {
    const state = profileOrdersReducer(
      createState({ isConnected: true, orders }),
      profileOrdersActions.disconnect()
    );

    expect(state.isConnected).toBe(false);
    expect(state.orders).toEqual([]);
  });

  it('should handle wsOpen', () => {
    const state = profileOrdersReducer(
      createState({ error: 'Ошибка' }),
      profileOrdersActions.wsOpen()
    );

    expect(state.isConnected).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle wsClose', () => {
    const state = profileOrdersReducer(
      createState({ isConnected: true, orders }),
      profileOrdersActions.wsClose()
    );

    expect(state.isConnected).toBe(false);
    expect(state.orders).toEqual([]);
  });

  it('should handle wsError', () => {
    const error = 'Ошибка соединения';
    const state = profileOrdersReducer(
      createState({ orders }),
      profileOrdersActions.wsError(error)
    );

    expect(state.error).toBe(error);
    expect(state.orders).toEqual([]);
  });

  it('should handle wsMessage', () => {
    const payload = { orders };
    const state = profileOrdersReducer(
      createState(),
      profileOrdersActions.wsMessage(payload)
    );

    expect(state.orders).toEqual(orders);
  });
});
