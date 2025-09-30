import { Middleware, AnyAction, MiddlewareAPI, Dispatch } from 'redux';
import { getCookie } from '../../utils/cookie';
import { RootState } from '../store';

export type TSocketActions<TPayload = unknown> = {
  connect: string;
  disconnect: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
  sendMessage?: string;
  wsUrl: string;
  withAuth?: boolean;
  prepareData?: (data: TPayload, state: unknown) => unknown;
};

export const socketMiddleware = <TPayload = unknown>(
  socketActions: TSocketActions<TPayload>
): Middleware => {
  const {
    wsUrl,
    connect,
    disconnect,
    onOpen,
    onClose,
    onError,
    onMessage,
    sendMessage,
    withAuth,
    prepareData
  } = socketActions;

  return (store: MiddlewareAPI<Dispatch<AnyAction>, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const act = action as AnyAction;

      if (act.type === connect) {
        const token = withAuth
          ? getCookie('accessToken') || localStorage.getItem('accessToken')
          : null;
        const url = token
          ? `${wsUrl}?token=${token.replace('Bearer ', '')}`
          : wsUrl;
        socket = new WebSocket(url);

        socket.onopen = () => dispatch({ type: onOpen });
        socket.onerror = () =>
          dispatch({ type: onError, payload: 'WebSocket error' });
        socket.onclose = (event) =>
          dispatch({ type: onClose, payload: event.code });
        socket.onmessage = (event) => {
          try {
            dispatch({ type: onMessage, payload: JSON.parse(event.data) });
          } catch (err) {
            dispatch({ type: onError, payload: (err as Error).message });
          }
        };
      }

      if (socket && sendMessage && act.type === sendMessage) {
        const state = getState();
        const payload = prepareData
          ? prepareData(act.payload, state)
          : act.payload;
        socket.send(JSON.stringify(payload));
      }

      if (socket && act.type === disconnect) {
        socket.close();
        socket = null;
      }

      return next(act);
    };
  };
};
