export const CHANGE = 'skills-matrix/employee-edit/CHANGE'
export const RESET = 'skills-matrix/employee-edit/RESET'

export const employeeEditChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const employeeEditReset = () => ({
  type: RESET
})

const initialState = {
  description: '',
  title: '',
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
    default:
      return state
  }
}