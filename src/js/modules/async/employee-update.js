import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import {employeeChange} from '../employee'
import fetch from 'isomorphic-fetch'

export const FAILURE = 'skills-matrix/async/employee-update/FAILURE'
export const REQUEST = 'skills-matrix/async/employee-update/REQUEST'
export const SUCCESS = 'skills-matrix/async/employee-update/SUCCESS'

export const employeepdateFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const employeeUpdateRequest = () => ({
  type: REQUEST
})

export const employeeUpdateSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const employeeUpdate = (payload) =>
  (dispatch) => {
    dispatch(employeeUpdateRequest())

    return fetch(`${apiUri}/employees/${payload._id}`, {
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
      dispatch(employeeUpdateSuccess(json))
      dispatch(employeeChange(json))
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