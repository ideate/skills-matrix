export const CHANGE = 'skills-matrix/employee-create/CHANGE'
export const RESET = 'skills-matrix/employee-create/RESET'

export const employeeCreateChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const employeeCreateReset = () => ({
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