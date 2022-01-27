import { ApiResponse } from 'apisauce';

import { ActionType } from './types';



export const loginRequest = (data: object) => {
  return { type: ActionType.LOGIN_REQUEST, payload: data };
};
export const loginSuccess = (data: APILoginRespose) => {
  return { type: ActionType.LOGIN_SUCCESS, payload: { data } };
};
export const loginFail = (err: ApiResponse<any, any>) => {
  
  return { type: ActionType.LOGIN_FAIL, payload: { err } };
};

export const signupRequest = (data: object) => {
  return { type: ActionType.SIGNUP_REQUEST, payload: data };
};
export const signupSuccess = (data: APISignupResponse) => {
  return { type: ActionType.SIGNUP_SUCCESS, payload: { data } };
};
export const signupFail = (err: ApiResponse<any, any>) => {
  return { type: ActionType.SIGNUP_FAIL, payload: { err } };
};
