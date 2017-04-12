import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import '@lanetix/unum/lib/css/index.css'

import reducers from './reducers'
import SearchTerm from './search-term'
import Tweets from './tweets'

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension
      ? window.devToolsExtension()
      : i => i
  )
)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <SearchTerm />
      <Tweets />
    </div>
  </Provider>,
  document.getElementById('root')
)
