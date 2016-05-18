export const CHANGE = 'skills-matrix/organization-edit/CHANGE'
export const RESET = 'skills-matrix/organization-edit/RESET'

export const organizationEditChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const organizationEditReset = () => ({
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