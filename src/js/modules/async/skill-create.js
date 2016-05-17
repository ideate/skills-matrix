import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'

export const FAILURE = 'skills-matrix/async/skill-create/FAILURE'
export const REQUEST = 'skills-matrix/async/skill-create/REQUEST'
export const SUCCESS = 'skills-matrix/async/skill-create/SUCCESS'

export const skillCreateFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const skillCreateRequest = () => ({
  type: REQUEST
})

export const skillCreateSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const skillCreate = (payload) =>
  (dispatch) => {
    dispatch(skillCreateRequest())

    return fetch(`${apiUri}/skills`, {
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
      dispatch(skillCreateSuccess(json))
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