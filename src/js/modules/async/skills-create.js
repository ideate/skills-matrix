import {apiUri} from '../../../../config'
import {checkFetchStatus} from './utilities'
import fetch from 'isomorphic-fetch'
// import {fetchDashboards} from './dashboards'
// import {setDashboard} from './dashboard'

export const FAILURE = 'skills-matrix/async/skills-create/FAILURE'
export const REQUEST = 'skills-matrix/async/skills-create/REQUEST'
export const SUCCESS = 'skills-matrix/async/skills-create/SUCCESS'

export const skillsCreateFailure = (error) => ({
  payload: {error},
  type: FAILURE
})
export const skillsCreateRequest = () => ({
  type: REQUEST
})
export const skillsCreateSuccess = (data) => ({
  payload: {data},
  recievedAt: Date.now(),
  type: SUCCESS
})
export const skillsCreate = (payload) =>
  (dispatch) => {
    dispatch(skillsCreateRequest())

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
      dispatch(skillsCreateSuccess(json))
      // FUTURE: OPTIMISTIC UPDATE INSTEAD
      // dispatch(fetchDashboards())
      //   .then(() => {
      //     const {_id: id, subtitle, title} = json

      //     dispatch(setDashboard(id, subtitle, title))
      //   })
    })
    // .catch((error) => dispatch(createDashboardFailure(error)))
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