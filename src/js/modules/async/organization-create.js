import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'
import {snackbarChange} from '../snackbar'

export const FAILURE = 'skills-matrix/async/organization-create/FAILURE'
export const REQUEST = 'skills-matrix/async/organization-create/REQUEST'
export const SUCCESS = 'skills-matrix/async/organization-create/SUCCESS'

export const organizationCreateFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const organizationCreateRequest = () => ({
  type: REQUEST
})

export const organizationCreateSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const organizationCreate = (payload) =>
  (dispatch) => {
    dispatch(organizationCreateRequest())

    return fetch(`${apiUri}/organizations`, {
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
      dispatch(organizationCreateSuccess(json))
      dispatch(snackbarChange({
        message: 'Organization created!',
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