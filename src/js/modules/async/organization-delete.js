import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'
import {snackbarChange} from '../snackbar'

export const FAILURE = 'skills-matrix/async/organization-delete/FAILURE'
export const REQUEST = 'skills-matrix/async/organization-delete/REQUEST'
export const SUCCESS = 'skills-matrix/async/organization-delete/SUCCESS'

export const organizationDeleteFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const organizationDeleteRequest = () => ({
  type: REQUEST
})

export const organizationDeleteSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const organizationDelete = (payload) =>
  (dispatch) => {
    dispatch(organizationDeleteRequest())

    return fetch(`${apiUri}/organizations/${payload}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(checkFetchStatus)
    .then((response) => response.json())
    .then((json) => {
      dispatch(organizationDeleteSuccess(json))
      dispatch(snackbarChange({
        message: 'Organization deleted!',
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