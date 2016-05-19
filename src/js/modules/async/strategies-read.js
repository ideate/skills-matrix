import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'
import {strategiesChange} from '../strategies'

export const FAILURE = 'skills-matrix/async/strategies-read/FAILURE'
export const REQUEST = 'skills-matrix/async/strategies-read/REQUEST'
export const SUCCESS = 'skills-matrix/async/strategies-read/SUCCESS'

export const strategiesReadFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const strategiesReadRequest = () => ({
  type: REQUEST
})

export const strategiesReadSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const strategiesRead = (payload) =>
  (dispatch) => {
    dispatch(strategiesReadRequest())

    return fetch(`${apiUri}/strategies`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(checkFetchStatus)
    .then((response) => response.json())
    .then((json) => {
      dispatch(strategiesReadSuccess(json))
      dispatch(strategiesChange({data: json}))
    })
  }

const initialState = {
  data: {},
  error: undefined,
  isFetching: false,
  lastUpdated: null
}

export default (state = initialState, {payload = {}, type, ...action}) => {
  const {data, error} = payload

  switch (type) {
    case FAILURE:
      return {
        ...state,
        error,
        isFetching: false
      }
    case REQUEST:
      return {
        ...state,
        error: undefined,
        isFetching: true
      }
    case SUCCESS:
      return {
        ...state,
        data,
        error: undefined,
        isFetching: false,
        lastUpdated: action.recievedAt
      }
    default:
      return state
  }
}