import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'
import {employeeChange, employeeReset} from '../employee'
import {employeeEditChange, employeeEditReset} from '../employee-edit'

export const FAILURE = 'skills-matrix/async/employee-read/FAILURE'
export const REQUEST = 'skills-matrix/async/employee-read/REQUEST'
export const SUCCESS = 'skills-matrix/async/employee-read/SUCCESS'

export const employeeReadFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const employeeReadRequest = () => ({
  type: REQUEST
})

export const employeeReadSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const employeeRead = (payload) =>
  (dispatch) => {
    dispatch(employeeReadRequest())
    dispatch(employeeReset())
    dispatch(employeeEditReset())

    return fetch(`${apiUri}/employees/${payload}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(checkFetchStatus)
    .then((response) => response.json())
    .then((json) => {
      dispatch(employeeReadSuccess(json))
      dispatch(employeeChange(json))
      dispatch(employeeEditChange(json))
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