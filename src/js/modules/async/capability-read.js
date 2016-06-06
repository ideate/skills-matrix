import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'
import {capabilityChange, capabilityReset} from '../capability'
import {capabilityEditChange, capabilityEditReset} from '../capability-edit'

export const FAILURE = 'skills-matrix/async/capability-read/FAILURE'
export const REQUEST = 'skills-matrix/async/capability-read/REQUEST'
export const SUCCESS = 'skills-matrix/async/capability-read/SUCCESS'

export const capabilityReadFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const capabilityReadRequest = () => ({
  type: REQUEST
})

export const capabilityReadSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const capabilityRead = (payload) =>
  (dispatch) => {
    dispatch(capabilityReadRequest())
    dispatch(capabilityReset())
    dispatch(capabilityEditReset())

    return fetch(`${apiUri}/capabilities/${payload}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(checkFetchStatus)
    .then((response) => response.json())
    .then((json) => {
      dispatch(capabilityReadSuccess(json))
      dispatch(capabilityChange(json))
      dispatch(capabilityEditChange(json))
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