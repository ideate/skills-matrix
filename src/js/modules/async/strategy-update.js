import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'
import {strategyChange} from '../strategy'

export const FAILURE = 'skills-matrix/async/strategy-update/FAILURE'
export const REQUEST = 'skills-matrix/async/strategy-update/REQUEST'
export const SUCCESS = 'skills-matrix/async/strategy-update/SUCCESS'

export const strategyUpdateFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const strategyUpdateRequest = () => ({
  type: REQUEST
})

export const strategyUpdateSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const strategyUpdate = (payload) =>
  (dispatch) => {
    dispatch(strategyUpdateRequest())

    return fetch(`${apiUri}/strategies/${payload._id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(checkFetchStatus)
    .then((response) => response.json())
    .then((json) => {
      dispatch(strategyUpdateSuccess(json))
      dispatch(strategyChange(json))
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