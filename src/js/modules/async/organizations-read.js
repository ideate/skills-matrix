import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import {dashboardsChange} from '../dashboards'
import fetch from 'isomorphic-fetch'
import {organizationsChange} from '../organizations'

export const FAILURE = 'skills-matrix/async/organizations-read/FAILURE'
export const REQUEST = 'skills-matrix/async/organizations-read/REQUEST'
export const SUCCESS = 'skills-matrix/async/organizations-read/SUCCESS'

export const organizationsReadFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const organizationsReadRequest = () => ({
  type: REQUEST
})

export const organizationsReadSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const organizationsRead = (payload) =>
  (dispatch) => {
    dispatch(organizationsReadRequest())

    return fetch(`${apiUri}/organizations`, {
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
      dispatch(organizationsReadSuccess(json))
      dispatch(organizationsChange({data: json}))
      dispatch(dashboardsChange({organizations: json}))
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