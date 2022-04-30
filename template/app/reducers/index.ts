import { all } from 'redux-saga/effects'
import { combineReducers } from 'redux';
import { appInteractionSagaWatcher } from './app-interactions-saga'
import auth, { watchAuth } from './auth'
import network from './network'

export const rootReducer = combineReducers({
  auth,
  network
})

export function* rootSaga() {
  yield all([
    appInteractionSagaWatcher(),
    watchAuth(),
  ])
}
