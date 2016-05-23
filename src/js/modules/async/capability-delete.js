import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'
import {snackbarChange} from '../snackbar'

export const FAILURE = 'skills-matrix/async/capability-delete/FAILURE'
export const REQUEST = 'skills-matrix/async/capability-delete/REQUEST'
export const SUCCESS = 'skills-matrix/async/capability-delete/SUCCESS'

export const capabilityDeleteFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const capabilityDeleteRequest = () => ({
  type: REQUEST
})

export const capabilityDeleteSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const capabilityDelete = (payload) =>
  (dispatch) => {
    dispatch(capabilityDeleteRequest())

    return fetch(`${apiUri}/capabilities/${payload}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(checkFetchStatus)
    .then((response) => response.json())
    .then((json) => {
      dispatch(capabilityDeleteSuccess(json))
      dispatch(snackbarChange({
        message: 'Capability deleted!',
        open: true
      }))
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