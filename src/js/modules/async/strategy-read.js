import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'
import {strategyChange} from '../strategy'
import {strategyEditChange} from '../strategy-edit'

export const FAILURE = 'skills-matrix/async/strategy-read/FAILURE'
export const REQUEST = 'skills-matrix/async/strategy-read/REQUEST'
export const SUCCESS = 'skills-matrix/async/strategy-read/SUCCESS'

export const strategyReadFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const strategyReadRequest = () => ({
  type: REQUEST
})

export const strategyReadSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const strategyRead = (payload) =>
  (dispatch) => {
    dispatch(strategyReadRequest())

    return fetch(`${apiUri}/strategies/${payload}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(checkFetchStatus)
    .then((response) => response.json())
    .then((json) => {
      dispatch(strategyReadSuccess(json))
      dispatch(strategyChange(json))
      dispatch(strategyEditChange(json))
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