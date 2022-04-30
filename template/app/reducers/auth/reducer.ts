import { ActionType } from './types';
  
  const initialState: State = {
    fetching: false,
    data: null,
    err: null,
    isLoggedIn: false,
    isProfileComplete: false,
  };
  
const authReducer = (
    state: State = initialState,
    action: Action,
  ): State => {
    let nextState: State;
    switch (action.type) {
      case ActionType.LOGIN_REQUEST:
        return { ...state, fetching: true, data: null, err: null };
  
      case ActionType.LOGIN_SUCCESS:
        const loginData: APILoginRespose = action.payload.data;
        return {
          ...state,
          fetching: false,
          data: loginData.data,
          isLoggedIn: true,
          err: null,
        };
  
      case ActionType.SIGNUP_SUCCESS:
        const signupData: APISignupResponse = action.payload.data;
        return {
          ...state,
          fetching: false,
          data: signupData.data,
          isLoggedIn: true,
          err: null,
        };
  
      case ActionType.LOGIN_FAIL:
        return {
          ...state,
          fetching: false,
          data: null,
          err: action.payload.err,
        };
      case ActionType.SIGNUP_REQUEST:
        return { ...state, fetching: true, data: null, err: null };
  
      case ActionType.SIGNUP_FAIL:
        return {
          ...state,
          fetching: false,
          data: null,
          err: action.payload.err,
        };
      default:
        return state;
    }
  };

  export default authReducer