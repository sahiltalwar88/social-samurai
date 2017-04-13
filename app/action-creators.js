import axios from 'axios'
import { head, pathOr } from 'ramda'
import url from 'url'

import { appApiName, gatewayUri, jwt, spaceId } from './config'

export const SET_SEARCH_TERM = 'SET_SEARCH_TERM'
export const CLEAR_SEARCH_TERM = 'CLEAR_SEARCH_TERM'
export const FETCH_SEARCH_TERM = 'FETCH_SEARCH_TERM'
export const FETCH_TWEETS = 'FETCH_TWEETS'
export const SET_TWEETS = 'SET_TWEETS'

const getSearchTermFromResponse = response => ({
  contentId: response.id,
  searchTerm: pathOr('', ['data', 'searchTerm'], response)
})

export const fetchSearchTerm = () => async (dispatch) => {
  const requestUrl = url.resolve(gatewayUri, `/v1/spaces/${spaceId}/apps/${appApiName}/content`)
  const headers = { headers: { Authorization: `Bearer ${jwt}` } }
  const { data } = await axios.get(requestUrl, headers)

  const searchTerm = getSearchTermFromResponse(head(data))
  dispatch({ type: SET_SEARCH_TERM, searchTerm })
  dispatch(fetchTweets(searchTerm))
}

export const setSearchTerm = (contentId, searchTerm) => async (dispatch) => {
  dispatch({ type: CLEAR_SEARCH_TERM })

  const requestUrl = url.resolve(gatewayUri, `/v1/spaces/${spaceId}/apps/${appApiName}/content/${contentId}`)
  const newSearchTerm = { data: { searchTerm }, mimeType: 'vnd.lanetix.social-samurai.search' }
  const headers = { headers: { Authorization: `Bearer ${jwt}` } }
  const { data } = await axios.put(requestUrl, newSearchTerm, headers)

  const response = getSearchTermFromResponse(data)
  dispatch({ type: SET_SEARCH_TERM, searchTerm: response })
  dispatch(fetchTweets(searchTerm))
}

export const fetchTweets = ({ searchTerm }) => async (dispatch) => {
  const encodedSearchTerm = encodeURIComponent(searchTerm)
  const requestUrl = `http://localhost:12345/tweets/1.1/search/tweets.json?q=${encodedSearchTerm}`
  const { data } = await axios.get(requestUrl)
  console.log('data', data)
}
