import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'

export const FAILURE = 'skills-matrix/async/skills-delete/FAILURE'
export const REQUEST = 'skills-matrix/async/skills-delete/REQUEST'
export const SUCCESS = 'skills-matrix/async/skills-delete/SUCCESS'

export const skillsDeleteFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const skillsDeleteRequest = () => ({
  type: REQUEST
})

export const skillsDeleteSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const skillsDelete = (payload) =>
  (dispatch) => {
    dispatch(skillsDeleteRequest())

    return fetch(`${apiUri}/skills/${payload._id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(checkFetchStatus)
    .then((response) => response.json())
    .then((json) => {
      dispatch(skillsCreateSuccess(json))
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