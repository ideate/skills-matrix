export const CHANGE = 'skills-matrix/dashboards-strategies/CHANGE'
export const RESET = 'skills-matrix/dashboards-strategies/RESET'
export const SELECT_RESET = 'skills-matrix/dashboards-strategies/SELECT_RESET'

export const dashboardsStrategiesChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const dashboardsStrategiesReset = () => ({
  type: RESET
})

export const dashboardsStrategiesSelectReset = () => ({
  type: SELECT_RESET
})

const initialState = {
  skills: []
}

export default (state = initialState, {payload = {}, type, ...action}) => {
  const {value} = payload

  switch (type) {
    case CHANGE:
      return {
        ...state,
        ...value
      }
    case RESET:
      return initialState
    case SELECT_RESET:
      return {
        ...state,
        skills: []
      }
    default:
      return state
  }
}