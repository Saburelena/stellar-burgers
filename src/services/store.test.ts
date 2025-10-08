import { AnyAction } from 'redux';
import { rootReducer } from './store';
import ingredientsReducer from './slices/ingredientsSlice';
import constructorReducer from './slices/constructorSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';
import { feedReducer } from './slices/feedSlice';
import { profileOrdersReducer } from './slices/profileOrdersSlice';

const unknownAction: AnyAction = { type: 'UNKNOWN_ACTION' };

describe('rootReducer', () => {
  it('should return the initial state when action is unknown', () => {
    const state = rootReducer(undefined, unknownAction);

    const expectedState = {
      ingredients: ingredientsReducer(undefined, unknownAction),
      constructorBurger: constructorReducer(undefined, unknownAction),
      order: orderReducer(undefined, unknownAction),
      user: userReducer(undefined, unknownAction),
      feed: feedReducer(undefined, unknownAction),
      profileOrders: profileOrdersReducer(undefined, unknownAction)
    };

    expect(state).toEqual(expectedState);
  });
});
