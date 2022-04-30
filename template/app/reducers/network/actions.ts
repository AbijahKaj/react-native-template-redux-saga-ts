import { ActionType } from './types'

export const sendNetworkFail = (err: any) => {
  return { type: ActionType.SEND_NETWORK_FAIL, payload: { err } };
};

export const clearNetworkFail = () => {
  return { type: ActionType.CLEAR_NETWORK_FAIL };
};
