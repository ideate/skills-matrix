export const RESET = 'skills-matrix/create-organizations-dialog/RESET'
export const CHANGE = 'skills-matrix/create-organizations-dialog/CHANGE'

export const changeOrganizationsDialog = (value) => ({
  payload: {value},
  type: CHANGE
})

export const resetOrganizationsDialog = () => ({
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