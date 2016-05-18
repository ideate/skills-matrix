export const CHANGE = 'skills-matrix/employee/CHANGE'
export const RESET = 'skills-matrix/employee/RESET'

export const employeeChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const employeeReset = () => ({
  type: RESET
})

const initialState = {
  description: '',
  title: ''
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