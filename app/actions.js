import axios from 'axios'
import edgarFacts from 'edgar-facts'
import url from 'url'

import {
  appApiName,
  gatewayUri,
  jwt,
  spaceId
} from './config'

export const RECEIVE_ITEM = 'RECEIVE_ITEM'
export const REQUEST_ITEM = 'REQUEST_ITEM'
export const fetchItem = (contentId) => async (dispatch) => {
  dispatch({ type: REQUEST_ITEM })
  const { data: item } = await axios(
    url.resolve(
      gatewayUri,
      `/v1/spaces/${spaceId}/apps/${appApiName}/content/${contentId}`
    ),
    {
      headers: { Authorization: `Bearer ${jwt}` }
    }
  )
  dispatch({
    type: RECEIVE_ITEM,
    item
  })
}

export const RECEIVE_LIST = 'RECEIVE_LIST'
export const REQUEST_LIST = 'REQUEST_LIST'
export const fetchList = () => async (dispatch) => {
  dispatch({ type: REQUEST_LIST })
  const { data: list } = await axios(
    url.resolve(
      gatewayUri,
      `/v1/spaces/${spaceId}/apps/${appApiName}/content`
    ),
    {
      headers: { Authorization: `Bearer ${jwt}` }
    }
  )
  dispatch({
    type: RECEIVE_LIST,
    list
  })
}

export const RECEIVE_CREATE_FACT = 'RECEIVE_CREATE_FACT'
export const REQUEST_CREATE_FACT = 'REQUEST_CREATE_FACT'
export const createFact = () => async (dispatch) => {
  const edgarFact = edgarFacts()
  dispatch({ type: REQUEST_CREATE_FACT, fact: edgarFact })
  const { data: fact } = await axios.post(
    url.resolve(
      gatewayUri,
      `/v1/spaces/${spaceId}/apps/${appApiName}/content`
    ),
    {
      data: { name: edgarFact },
      mimeType: 'vnd.com.edgar.fact'
    },
    {
      headers: { Authorization: `Bearer ${jwt}` }
    }
  )
  dispatch({ type: RECEIVE_CREATE_FACT, fact })
}
