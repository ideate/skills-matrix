import {apiUri} from '../../../../config'
import {capabilityChange} from '../capability'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'

export const FAILURE = 'skills-matrix/async/capability-update/FAILURE'
export const REQUEST = 'skills-matrix/async/capability-update/REQUEST'
export const SUCCESS = 'skills-matrix/async/capability-update/SUCCESS'

export const capabilityUpdateFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const capabilityUpdateRequest = () => ({
  type: REQUEST
})

export const capabilityUpdateSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const capabilityUpdate = (payload) =>
  (dispatch) => {
    dispatch(capabilityUpdateRequest())

    return fetch(`${apiUri}/capabilities/${payload._id}`, {
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
      dispatch(capabilityUpdateSuccess(json))
      dispatch(capabilityChange(json))
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