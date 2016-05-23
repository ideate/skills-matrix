export const CHANGE = 'skills-matrix/snackbar/CHANGE'
export const RESET = 'skills-matrix/snackbar/RESET'

export const snackbarChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const snackbarReset = () => ({
  type: RESET
})

const initialState = {
  message: '',
  open: false
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