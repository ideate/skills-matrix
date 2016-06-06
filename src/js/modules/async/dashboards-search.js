import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import {dashboardsChange} from '../dashboards'
import fetch from 'isomorphic-fetch'
import {snackbarChange} from '../snackbar'

export const FAILURE = 'skills-matrix/async/dashboards-create/FAILURE'
export const REQUEST = 'skills-matrix/async/dashboards-create/REQUEST'
export const SUCCESS = 'skills-matrix/async/dashboards-create/SUCCESS'

export const dashboardsSearchFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const dashboardsSearchRequest = () => ({
  type: REQUEST
})

export const dashboardsSearchSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const dashboardsSearch = (payload) =>
  (dispatch) => {
    dispatch(dashboardsSearchRequest())

    return fetch(`${apiUri}/dashboards`, {
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
      dispatch(dashboardsSearchSuccess(json))
      dispatch(snackbarChange({
        message: 'Search completed!',
        open: true
      }))
      dispatch(dashboardsChange(json))
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