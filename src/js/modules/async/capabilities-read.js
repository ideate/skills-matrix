import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'
import {capabilitiesChange, capabilitiesReset} from '../capabilities'
import {dashboardsChange, dashboardsReset} from '../dashboards'

export const FAILURE = 'skills-matrix/async/capabilities-read/FAILURE'
export const REQUEST = 'skills-matrix/async/capabilities-read/REQUEST'
export const SUCCESS = 'skills-matrix/async/capabilities-read/SUCCESS'

export const capabilitiesReadFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const capabilitiesReadRequest = () => ({
  type: REQUEST
})

export const capabilitiesReadSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const capabilitiesRead = (payload) =>
  (dispatch) => {
    dispatch(capabilitiesReadRequest())
    dispatch(capabilitiesReset())
    dispatch(dashboardsReset())
    
    return fetch(`${apiUri}/capabilities`, {
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
      dispatch(capabilitiesReadSuccess(json))
      dispatch(capabilitiesChange({data: json}))
      dispatch(dashboardsChange({capabilities: json}))
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