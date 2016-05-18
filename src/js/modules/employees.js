export const CHANGE = 'skills-matrix/employees/CHANGE'
export const RESET = 'skills-matrix/employees/RESET'

export const employeesChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const employeesReset = () => ({
  type: RESET
})

const initialState = {
  data: {}
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
    default:
      return state
  }
}