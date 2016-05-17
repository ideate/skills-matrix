import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'
import {skillChange} from '../skill'

export const FAILURE = 'skills-matrix/async/skill-update/FAILURE'
export const REQUEST = 'skills-matrix/async/skill-update/REQUEST'
export const SUCCESS = 'skills-matrix/async/skill-update/SUCCESS'

export const skillUpdateFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const skillUpdateRequest = () => ({
  type: REQUEST
})

export const skillUpdateSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const skillUpdate = (payload) =>
  (dispatch) => {
    dispatch(skillUpdateRequest())

    return fetch(`${apiUri}/skills/${payload}/update`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(checkFetchStatus)
    .then((response) => response.json())
    .then((json) => {
      dispatch(skillUpdateSuccess(json))
      dispatch(skillChange({data: json}))
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