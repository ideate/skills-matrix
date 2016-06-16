import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import {dashboardsStrategiesChange} from '../dashboards-strategies'
import fetch from 'isomorphic-fetch'
import {snackbarChange} from '../snackbar'

export const FAILURE = 'skills-matrix/async/dashboards-strategies-read/FAILURE'
export const REQUEST = 'skills-matrix/async/dashboards-strategies-read/REQUEST'
export const SUCCESS = 'skills-matrix/async/dashboards-strategies-read/SUCCESS'

export const dashboardsStrategiesFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const dashboardsStrategiesRequest = () => ({
  type: REQUEST
})

export const dashboardsStrategiesSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const dashboardsStrategiesRead = (payload) =>
  (dispatch) => {
    dispatch(dashboardsStrategiesRequest())

    return fetch(`${apiUri}/dashboards/strategies`, {
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
      dispatch(dashboardsStrategiesSuccess(json))
      dispatch(snackbarChange({
        message: 'Search completed!',
        open: true
      }))
      dispatch(dashboardsStrategiesChange(json))
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