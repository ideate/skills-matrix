export const CHANGE = 'skills-matrix/organizations/CHANGE'
export const RESET = 'skills-matrix/organizations/RESET'

export const organizationsChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const organizationsReset = () => ({
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