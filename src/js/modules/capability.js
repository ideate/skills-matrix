export const CHANGE = 'skills-matrix/capability/CHANGE'
export const RESET = 'skills-matrix/capability/RESET'

export const capabilityChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const capabilityReset = () => ({
  type: RESET
})

const initialState = {
  description: '',
  title: '',
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