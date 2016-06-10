export const CHANGE = 'skills-matrix/strategy-create/CHANGE'
export const RESET = 'skills-matrix/strategy-create/RESET'

export const strategyCreateChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const strategyCreateReset = () => ({
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