export const CHANGE = 'skills-matrix/capability-create/CHANGE'
export const RESET = 'skills-matrix/capability-create/RESET'

export const capabilityCreateChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const capabilityCreateReset = () => ({
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