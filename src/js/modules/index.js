import {combineReducers} from 'redux'
import createCapabilitiesDialog from './create-capabilities-dialog'
import createOrganizationsDialog from './create-organizations-dialog'
import {routerReducer as routing} from 'react-router-redux'
import skill from './skill'
import skillEdit from './skill-edit'
import skills from './skills'
import skillsCreateForm from './skills-create-form'
import user from './async/user'

export const rootReducer = combineReducers({
  createCapabilitiesDialog,
  createOrganizationsDialog,
  skill,
  skillEdit,
  skills,
  skillsCreateForm,
  user,
  
  // for react-router-redux
  routing
})