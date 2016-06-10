export const CHANGE = 'skills-matrix/strategy/CHANGE'
export const RESET = 'skills-matrix/strategy/RESET'

export const strategyChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const strategyReset = () => ({
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