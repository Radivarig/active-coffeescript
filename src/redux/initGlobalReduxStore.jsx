import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducers/reducer'

module.exports = () => {

  // Global store
  window.ReduxStore = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument({
    }))
  )
}
