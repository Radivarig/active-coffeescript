import { Map as EMap} from 'extendable-immutable'
import Immutable, { List } from 'immutable'

export class AppState extends EMap {
  isEdit: boolean
  coffeeObject: Object

  constructor () {
    super({isEdit: false, coffeeObject: {}})
  }
}

export const actions = {
  setIsEdit (isEdit: boolean) {
    return {
      type: 'SET_IS_EDIT',
      isEdit,
    }
  },

  setCoffeeObject (coffeeObject: Object) {
    return {
      type: 'SET_COFFEE_OBJECT',
      coffeeObject,
    }
  },

}

export const getAppStateDispatches = (dispatch) => ({
  setIsEdit: (...args) => dispatch(actions.setIsEdit.apply(null, args)),
  setCoffeeObject: (...args) => dispatch(actions.setCoffeeObject.apply(null, args)),
})

const initialState: AppState = new AppState()
export const appState = (state = initialState, action) => {

  switch (action.type) {
    case 'SET_IS_EDIT':
      return state.set('isEdit', action.isEdit)

    case 'SET_COFFEE_OBJECT':
      return state.set('coffeeObject', action.coffeeObject)

    default:
      return state
  }
}
