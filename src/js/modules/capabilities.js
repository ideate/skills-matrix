export const CHANGE = 'skills-matrix/capabilities/CHANGE'
export const RESET = 'skills-matrix/capabilities/RESET'

export const capabilitiesChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const capabilitiesReset = () => ({
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