export const RESET = 'skills-matrix/skills/RESET'
export const CHANGE = 'skills-matrix/skills/CHANGE'

export const skillsChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const skillsReset = () => ({
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