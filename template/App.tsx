import React, { Component } from "react";
import createSagaMiddleware from "redux-saga";
import AsyncStorage from "@react-native-community/async-storage";
import { applyMiddleware, compose, createStore, Store } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import applyAppStateListener from 'redux-enhancer-react-native-appstate'
import { composeWithDevTools } from 'redux-devtools-extension'

import { rootReducer, rootSaga } from "./app/reducers";
import { RootScreen } from "./app/screens";

import { initI18n, I18nextProvider } from "app/utils/i18next";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware]

let composer: typeof compose = compose

if (__DEV__) {
  const { logger } = require('redux-logger')
  middlewares.push(logger)
  composer = composeWithDevTools({ maxAge: 200 })
}

const createStoreWithMiddleware = composer(
  applyAppStateListener(),
  applyMiddleware(...middlewares),
)(createStore)

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store: Store = createStoreWithMiddleware(persistedReducer);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

const i18n = initI18n({});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <RootScreen />
          </I18nextProvider>
        </PersistGate>
      </Provider>
    );
  }
}
