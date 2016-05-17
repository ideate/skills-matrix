export const CHANGE = 'skills-matrix/skill-create/CHANGE'
export const RESET = 'skills-matrix/skill-create/RESET'

export const skillCreateChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const skillCreateReset = () => ({
  type: RESET
})

const initialState = {
  description: '',
  title: ''
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