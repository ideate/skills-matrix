import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import {employeesChange} from '../employees'
import fetch from 'isomorphic-fetch'

export const FAILURE = 'skills-matrix/async/employees-read/FAILURE'
export const REQUEST = 'skills-matrix/async/employees-read/REQUEST'
export const SUCCESS = 'skills-matrix/async/employees-read/SUCCESS'

export const employeesReadFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const employeesReadRequest = () => ({
  type: REQUEST
})

export const employeesReadSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const employeesRead = (payload) =>
  (dispatch) => {
    dispatch(employeesReadRequest())

    return fetch(`${apiUri}/employees`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(checkFetchStatus)
    .then((response) => response.json())
    .then((json) => {
      dispatch(employeesReadSuccess(json))
      dispatch(employeesChange({data: json}))
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