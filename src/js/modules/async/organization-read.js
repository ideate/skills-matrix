import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'
import {organizationChange} from '../organization'
import {organizationEditChange} from '../organization-edit'

export const FAILURE = 'skills-matrix/async/organization-read/FAILURE'
export const REQUEST = 'skills-matrix/async/organization-read/REQUEST'
export const SUCCESS = 'skills-matrix/async/organization-read/SUCCESS'

export const organizationReadFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const organizationReadRequest = () => ({
  type: REQUEST
})

export const organizationReadSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const organizationRead = (payload) =>
  (dispatch) => {
    dispatch(organizationReadRequest())

    return fetch(`${apiUri}/organizations/${payload}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(checkFetchStatus)
    .then((response) => response.json())
    .then((json) => {
      dispatch(organizationReadSuccess(json))
      dispatch(organizationChange(json))
      dispatch(organizationEditChange(json))
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