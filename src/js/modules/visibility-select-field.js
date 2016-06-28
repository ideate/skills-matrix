export const CHANGE = 'skills-matrix/visibility-select-field/CHANGE'
export const RESET = 'skills-matrix/visibility-select-field/RESET'

export const visibilitySelectFieldChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const visibilitySelectFieldReset = () => ({
  type: RESET
})

const initialState = {
  disabled: true,
  visibility: ''
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