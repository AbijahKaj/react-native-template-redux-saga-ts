import { eventChannel, END } from 'redux-saga'
import {
  // all,
  call,
  put,
  select,
  take,
  takeLatest,
  spawn,
} from 'redux-saga/effects'
import { FOREGROUND } from 'redux-enhancer-react-native-appstate'
import { ActionType as authActions } from './auth'

import { REHYDRATE } from 'redux-persist/es/constants'

function* onSuccessLogin() {
}

function* onAppForeground() {
  const { _persist, auth } = yield select()
  if (_persist.rehydrated && auth.legacyToken) {
  }
}

function* onRehydrate() {
  const { auth } = yield select()
}

export function* appInteractionSagaWatcher() {
  yield takeLatest(REHYDRATE, onRehydrate)
  yield takeLatest(authActions.LOGIN_SUCCESS, onSuccessLogin)
  yield takeLatest(FOREGROUND, onAppForeground)
}
