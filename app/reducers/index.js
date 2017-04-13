import { combineReducers } from 'redux'

import searchTerm from './search-term'
import tweets from './tweets'

export default combineReducers({ searchTerm, tweets })
