export const CHANGE = 'skills-matrix/dashboards/CHANGE'
export const RESET = 'skills-matrix/dashboards/RESET'
export const SELECT_RESET = 'skills-matrix/dashboards/SELECT_RESET'

export const dashboardsChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const dashboardsReset = () => ({
  type: RESET
})

export const dashboardsSelectReset = () => ({
  type: SELECT_RESET
})

const initialState = {
  capabilities:[],
  capabilitiesSelect:'',
  employees:[],
  employeesSelect:'',
  organizations:[],
  organizationsSelect:'',
  skills:[],
  skillsSelect:'',
  strategies:[],
  strategiesSelect:''
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
        capabilitiesSelect:'',
        employeesSelect:'',
        organizationsSelect:'',
        skillsSelect:'',
        strategiesSelect:''
      }
    default:
      return state
  }
}