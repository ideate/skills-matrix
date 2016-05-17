export const RESET = 'skills-matrix/skill-edit/RESET'
export const CHANGE = 'skills-matrix/skill-edit/CHANGE'

export const skillEditChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const skillEditReset = () => ({
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