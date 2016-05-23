import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'
import {snackbarChange} from '../snackbar'

export const FAILURE = 'skills-matrix/async/strategy-create/FAILURE'
export const REQUEST = 'skills-matrix/async/strategy-create/REQUEST'
export const SUCCESS = 'skills-matrix/async/strategy-create/SUCCESS'

export const strategyCreateFailure = (error) => ({
  payload: {error},
  type: FAILURE
})

export const strategyCreateRequest = () => ({
  type: REQUEST
})

export const strategyCreateSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})

export const strategyCreate = (payload) =>
  (dispatch) => {
    dispatch(strategyCreateRequest())

    return fetch(`${apiUri}/strategies`, {
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
      dispatch(strategyCreateSuccess(json))
      dispatch(snackbarChange({
        message: 'Strategy created!',
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