import { call, put, takeLatest } from 'redux-saga/effects';
import { login, signup } from '../../utils/api';
import { sendNetworkFail } from '../network';
import {
  loginFail,
  loginSuccess,
  signupFail,
  signupSuccess,
} from './actions';
import { ActionType } from './types';

export function* watchAuth() {
  yield takeLatest(ActionType.LOGIN_REQUEST, handleLogin);
  yield takeLatest(ActionType.SIGNUP_REQUEST, handleSignup);
}

function* handleLogin(action: Action) {
  try {
    const response = yield call(login, action.payload);
    if (response.ok) {
      yield put(loginSuccess(response.data));
    } else {
      let message = response.problem;
      if (response.problem == 'CLIENT_ERROR')
        message = response.originalError.toString();
      yield put(loginFail(message));
      yield put(sendNetworkFail(message));
    }
  } catch (error) {
    yield put(sendNetworkFail(error));
  }
}

function* handleSignup(action: Action) {
  try {
    const response = yield call(signup, action.payload);
    if (response.ok) {
      let responseData: APISignupResponse = response.data;
      yield put(signupSuccess(responseData));
    } else {
      let message = response.problem;
      if (response.problem == 'CLIENT_ERROR')
        message = response.originalError.toString();
      yield put(sendNetworkFail(message));
      yield put(signupFail(response));
    }
  } catch (error) {
    yield put(sendNetworkFail(error));
  }
}
