import { FETCH_TWEETS } from '../actions'

const INITIAL_STATE = Object.freeze({ contentId: undefined, searchTerm: '' })

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return action.searchTerm
    case CLEAR_SEARCH_TERM:
      return INITIAL_STATE
    default:
      return state
  }
}
