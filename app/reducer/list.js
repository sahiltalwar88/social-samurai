import {
  RECEIVE_CREATE_FACT,
  RECEIVE_LIST
} from '../actions'

export default (state = [], action) => {
  switch (action.type) {
    case RECEIVE_LIST:
      return action.list
    case RECEIVE_CREATE_FACT:
      return state.concat([action.fact])
    default:
      return state
  }
}
