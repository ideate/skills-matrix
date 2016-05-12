export const RESET = 'skills-matrix/create-capabilities-dialog/RESET'
export const CHANGE = 'skills-matrix/create-capabilities-dialog/CHANGE'

export const changeCapabilitiesDialog = (value) => ({
  payload: {value},
  type: CHANGE
})

export const resetCapabilitiesDialog = () => ({
  type: RESET
})

const initialState = {
  title: '',
  visibility: false
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