import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import { contentId } from './config'
import Item from './item'
import List from './list'
import reducer from './reducers'

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension
      ? window.devToolsExtension()
      : i => i
  )
)

ReactDOM.render(
  <Provider store={store}>
    {
      contentId
        ? <Item id={contentId} />
        : <List />
    }
  </Provider>,
  document.getElementById('root')
)
