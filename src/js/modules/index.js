import capabilities from './capabilities'
import capability from './capability'
import capabilityCreate from './capability-create'
import capabilityEdit from './capability-edit'
import {combineReducers} from 'redux'
import organization from './organization'
import organizationCreate from './organization-create'
import organizationEdit from './organization-edit'
import organizations from './organizations'
import {routerReducer as routing} from 'react-router-redux'
import skill from './skill'
import skillCreate from './skill-create'
import skillEdit from './skill-edit'
import skills from './skills'
import user from './async/user'

export const rootReducer = combineReducers({
  capabilities,
  capability,
  capabilityCreate,
  capabilityEdit,
  organization,
  organizationCreate,
  organizationEdit,
  organizations,
  skill,
  skillCreate,
  skillEdit,
  skills,
  user,
  
  // for react-router-redux
  routing
})