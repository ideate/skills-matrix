export const CHANGE = 'skills-matrix/strategy-edit/CHANGE'
export const RESET = 'skills-matrix/strategy-edit/RESET'

export const strategyEditChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const strategyEditReset = () => ({
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