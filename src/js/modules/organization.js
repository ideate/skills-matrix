export const CHANGE = 'skills-matrix/organization/CHANGE'
export const RESET = 'skills-matrix/organization/RESET'

export const organizationChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const organizationReset = () => ({
  type: RESET
})

const initialState = {
  description: '',
  title: '',
  employees: []
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