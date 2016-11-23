import { combineReducers } from 'redux'

import { requestResponse } from './requestResponse'
import { appState } from './appState'

export default combineReducers({
  requestResponse,
  appState,
})
