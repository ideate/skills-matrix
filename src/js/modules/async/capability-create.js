import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'
import {snackbarChange} from '../snackbar'

export const FAILURE = 'skills-matrix/async/capability-create/FAILURE'
export const REQUEST = 'skills-matrix/async/capability-create/REQUEST'
export const SUCCESS = 'skills-matrix/async/capability-create/SUCCESS'

export const capabilityCreateFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const capabilityCreateRequest = () => ({
  type: REQUEST
})

export const capabilityCreateSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const capabilityCreate = (payload) =>
  (dispatch) => {
    dispatch(capabilityCreateRequest())

    return fetch(`${apiUri}/capabilities`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(checkFetchStatus)
    .then((response) => response.json())
    .then((json) => {
      dispatch(capabilityCreateSuccess(json))
      dispatch(snackbarChange({
        message: 'Capability created!',
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