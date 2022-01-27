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
import { ActionType as authActions, migrateRequest, logout } from './auth'
import {
  ActionType as objectActions,
  // getObjectsRequest,
  GetObjectsSuccessAction,
  // getObjectStateRequest,
  wsObjectStateReceived,
} from './objects'

import { Nullable } from 'app/support/types'
import { apiConfig, ApiWSConnectionInfo, smarthab } from 'app/api'
import { REHYDRATE } from 'redux-persist/es/constants'

// import { getHeatersRequest } from './heaters'
// import { showToastNotification, ToastNotificationType } from './toast'

// function* getObjects() {
//   yield put(getObjectsRequest())
//   yield put(getHeatersRequest())
// }

let WSIO: Nullable<SocketIOClient.Socket> = null

function* createSocketConnection(socket: ApiWSConnectionInfo) {
  if (!WSIO) {
    const createSocketAsync = async (handler: (message: string) => void) => {
      WSIO = await smarthab.createSocket({
        debug: true,
        url: apiConfig.wsServerUrl!,
        port: socket.port,
        eventName: socket.canal,
        eventHandler: handler,
      })
      // console.warn({ WSIO })
    }

    const createSocketConnectionChannel = () => {
      return eventChannel((emitter) => {
        const handler = (message: string) => emitter(message)
        createSocketAsync(handler)

        return () => {
          emitter(END)
        }
      })
    }

    const channel = yield call(createSocketConnectionChannel)

    while (true) {
      const wsMessage = yield take(channel)
      if (wsMessage) {
        yield put(wsObjectStateReceived(wsMessage))
      }
    }
  }
}

function* onSuccessObjects(action: GetObjectsSuccessAction) {
  const { socket /*, objects*/ } = action.payload
  if (!WSIO) {
    yield spawn(yield createSocketConnection, socket)
  }

  // try {
  //   const obj = objects.heatingSwitch[0]
  //   yield put(getObjectStateRequest(obj))
  // } catch (e) {
  //   console.warn(e)
  // }
}

function* onSuccessLogin() {
  // yield getObjects()
}

function* onAppForeground() {
  const { _persist, auth } = yield select()
  if (_persist.rehydrated && auth.legacyToken) {
    // yield getObjects()
    // yield all(
    //   Array.from({ length: 10 }, (_, index) =>
    //     put(
    //       showToastNotification({
    //         type: ToastNotificationType.Success,
    //         content: `title ${index}`,
    //         duration: 3000,
    //       }),
    //     ),
    //   ),
    // )
  }
}

function* onRehydrate() {
  const { auth } = yield select()

  if (!auth.migrated && (!auth.token || !auth.legacyToken || !auth.login)) {
    yield put(migrateRequest())
  }

  if (!auth.rememberMe) {
    yield put(logout())
  }
}

export function* appInteractionSagaWatcher() {
  yield takeLatest(REHYDRATE, onRehydrate)
  yield takeLatest(authActions.LOGIN_SUCCESS, onSuccessLogin)
  yield takeLatest(FOREGROUND, onAppForeground)
  yield takeLatest(objectActions.GET_OBJECTS_SUCCESS, onSuccessObjects)
}
