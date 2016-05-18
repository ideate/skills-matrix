export const CHANGE = 'skills-matrix/organization-create/CHANGE'
export const RESET = 'skills-matrix/organization-create/RESET'

export const organizationCreateChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const organizationCreateReset = () => ({
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