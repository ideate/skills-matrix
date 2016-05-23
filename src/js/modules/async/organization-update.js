import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'
import {organizationChange} from '../organization'
import {snackbarChange} from '../snackbar'

export const FAILURE = 'skills-matrix/async/organization-update/FAILURE'
export const REQUEST = 'skills-matrix/async/organization-update/REQUEST'
export const SUCCESS = 'skills-matrix/async/organization-update/SUCCESS'

export const organizationpdateFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const organizationUpdateRequest = () => ({
  type: REQUEST
})

export const organizationUpdateSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const organizationUpdate = (payload) =>
  (dispatch) => {
    dispatch(organizationUpdateRequest())

    return fetch(`${apiUri}/organizations/${payload._id}`, {
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
      dispatch(organizationUpdateSuccess(json))
      dispatch(organizationChange(json))
      dispatch(snackbarChange({
        message: 'Organization updated!',
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