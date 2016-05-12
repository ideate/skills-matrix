export const RESET = 'skills-matrix/skills-create-form/RESET'
export const CHANGE = 'skills-matrix/skills-create-form/CHANGE'

export const skillsCreateFormChange = (value) => ({
  payload: {value},
  type: CHANGE
})

export const skillsCreateFormReset = () => ({
  type: RESET
})

const initialState = {
  title: '',
  description: ''
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