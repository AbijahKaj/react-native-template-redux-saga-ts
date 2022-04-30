import { ActionType } from "./types";

const initialState: State = {
  fetching: false,
  data: null,
  err: null,
  isLoggedIn: false,
  isProfileComplete: false,
};

const network = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case ActionType.SEND_NETWORK_FAIL:
      return {
        ...state,
        err: action.payload.err,
      };
    case ActionType.CLEAR_NETWORK_FAIL:
      return {
        ...state,
        err: null,
      };
    default:
      return state;
  }
};

export default network