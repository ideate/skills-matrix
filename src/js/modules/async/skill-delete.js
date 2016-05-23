import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'
import {snackbarChange} from '../snackbar'

export const FAILURE = 'skills-matrix/async/skill-delete/FAILURE'
export const REQUEST = 'skills-matrix/async/skill-delete/REQUEST'
export const SUCCESS = 'skills-matrix/async/skill-delete/SUCCESS'

export const skillDeleteFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const skillDeleteRequest = () => ({
  type: REQUEST
})

export const skillDeleteSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const skillDelete = (payload) =>
  (dispatch) => {
    dispatch(skillDeleteRequest())

    return fetch(`${apiUri}/skills/${payload}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(checkFetchStatus)
    .then((response) => response.json())
    .then((json) => {
      dispatch(skillDeleteSuccess(json))
      dispatch(snackbarChange({
        message: 'Skill deleted!',
        open: true
      }))
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