import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'
import {snackbarChange} from '../snackbar'

export const FAILURE = 'skills-matrix/async/employee-delete/FAILURE'
export const REQUEST = 'skills-matrix/async/employee-delete/REQUEST'
export const SUCCESS = 'skills-matrix/async/employee-delete/SUCCESS'

export const employeeDeleteFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const employeeDeleteRequest = () => ({
  type: REQUEST
})

export const employeeDeleteSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const employeeDelete = (payload) =>
  (dispatch) => {
    dispatch(employeeDeleteRequest())

    return fetch(`${apiUri}/employees/${payload}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(checkFetchStatus)
    .then((response) => response.json())
    .then((json) => {
      dispatch(employeeDeleteSuccess(json))
      dispatch(snackbarChange({
        message: 'Employee deleted!',
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