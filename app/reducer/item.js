import {
  RECEIVE_ITEM
} from '../actions'

export default (state = null, action) => {
  switch (action.type) {
    case RECEIVE_ITEM:
      return action.item
    default:
      return state
  }
}
