import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import {dashboardsChange} from '../dashboards'
import fetch from 'isomorphic-fetch'
import {skillsChange} from '../skills'

export const FAILURE = 'skills-matrix/async/skills-read/FAILURE'
export const REQUEST = 'skills-matrix/async/skills-read/REQUEST'
export const SUCCESS = 'skills-matrix/async/skills-read/SUCCESS'

export const skillsReadFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const skillsReadRequest = () => ({
  type: REQUEST
})

export const skillsReadSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const skillsRead = (payload) =>
  (dispatch) => {
    dispatch(skillsReadRequest())

    return fetch(`${apiUri}/skills`, {
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
      dispatch(skillsReadSuccess(json))
      dispatch(skillsChange({data: json}))
      dispatch(dashboardsChange({skills: json}))
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