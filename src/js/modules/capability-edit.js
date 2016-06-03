export const CHANGE = 'skills-matrix/capability-edit/CHANGE'
export const RESET = 'skills-matrix/capability-edit/RESET'

export const capabilityEditChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const capabilityEditReset = () => ({
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