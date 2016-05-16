export const RESET = 'skills-matrix/skill/RESET'
export const CHANGE = 'skills-matrix/skill/CHANGE'

export const skillChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const skillReset = () => ({
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