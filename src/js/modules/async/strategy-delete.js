import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'

export const FAILURE = 'skills-matrix/async/strategy-delete/FAILURE'
export const REQUEST = 'skills-matrix/async/strategy-delete/REQUEST'
export const SUCCESS = 'skills-matrix/async/strategy-delete/SUCCESS'

export const strategyDeleteFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const strategyDeleteRequest = () => ({
  type: REQUEST
})

export const strategyDeleteSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const strategyDelete = (payload) =>
  (dispatch) => {
    dispatch(strategyDeleteRequest())

    return fetch(`${apiUri}/strategies/${payload}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(checkFetchStatus)
    .then((response) => response.json())
    .then((json) => {
      dispatch(strategyDeleteSuccess(json))
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