export const CHANGE = 'skills-matrix/strategies/CHANGE'
export const RESET = 'skills-matrix/strategies/RESET'

export const strategiesChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const strategiesReset = () => ({
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