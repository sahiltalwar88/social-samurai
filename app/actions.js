import axios from 'axios'
import { head, pathOr } from 'ramda'
import url from 'url'

import { appApiName, gatewayUri, jwt, spaceId } from './config'

export const SET_SEARCH_TERM = 'SET_SEARCH_TERM'
export const CLEAR_SEARCH_TERM = 'CLEAR_SEARCH_TERM'
export const FETCH_SEARCH_TERM = 'FETCH_SEARCH_TERM'

const getSearchTermFromResponse = response => ({
  contentId: response.id,
  searchTerm: pathOr('', ['data', 'searchTerm'], response)
})

export const fetchSearchTerm = () => async (dispatch) => {
  const requestUrl = url.resolve(gatewayUri, `/v1/spaces/${spaceId}/apps/${appApiName}/content`)
  const headers = { headers: { Authorization: `Bearer ${jwt}` } }
  const { data } = await axios.get(requestUrl, headers)

  const searchTerm = getSearchTermFromResponse(head(data))
  window.searchTerm = searchTerm.searchTerm
  dispatch({ type: SET_SEARCH_TERM, searchTerm })
}

export const setSearchTerm = (contentId, searchTerm) => async (dispatch) => {
  dispatch({ type: CLEAR_SEARCH_TERM })

  const requestUrl = url.resolve(gatewayUri, `/v1/spaces/${spaceId}/apps/${appApiName}/content/${contentId}`)
  const newSearchTerm = { data: { searchTerm }, mimeType: 'vnd.lanetix.social-samurai.search' }
  const headers = { headers: { Authorization: `Bearer ${jwt}` } }
  const { data } = await axios.put(requestUrl, newSearchTerm, headers)

  dispatch({ type: SET_SEARCH_TERM, searchTerm: getSearchTermFromResponse(data) })
}
