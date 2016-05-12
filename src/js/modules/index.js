import {combineReducers} from 'redux'
import createCapabilitiesDialog from './create-capabilities-dialog'
import createOrganizationsDialog from './create-organizations-dialog'
import {routerReducer as routing} from 'react-router-redux'
import skillsCreateForm from './skills-create-form'
import user from './async/user'

export const rootReducer = combineReducers({
  createCapabilitiesDialog,
  createOrganizationsDialog,
  skillsCreateForm,
  user,
  
  // for react-router-redux
  routing
})