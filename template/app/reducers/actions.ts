import { ActionType, AppClearDataAction } from './types'

export const clearData = (): AppClearDataAction => ({
  type: ActionType.CLEAR_DATA,
})
