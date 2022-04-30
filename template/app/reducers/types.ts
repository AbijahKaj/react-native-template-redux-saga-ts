import { FSA } from 'flux-standard-action'

export enum ActionType {
  CLEAR_DATA = 'CLEAR_DATA',
}

export interface AppClearDataAction extends FSA<ActionType.CLEAR_DATA> {}

export type AppAction = AppClearDataAction
