import { FETCH_TWEETS, SET_TWEETS } from '../action-creators'

const INITIAL_STATE = Object.freeze([])

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TWEETS:
      return INITIAL_STATE
    case SET_TWEETS:
      return action.tweets
    default:
      return state
  }
}
