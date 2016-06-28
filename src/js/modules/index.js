import capabilities from './capabilities'
import capability from './capability'
import capabilityCreate from './capability-create'
import capabilityEdit from './capability-edit'
import {combineReducers} from 'redux'
import dashboards from './dashboards'
import employee from './employee'
import employeeCreate from './employee-create'
import employeeEdit from './employee-edit'
import employees from './employees'
import organization from './organization'
import organizationCreate from './organization-create'
import organizationEdit from './organization-edit'
import organizations from './organizations'
import {routerReducer as routing} from 'react-router-redux'
import skill from './skill'
import skillCreate from './skill-create'
import skillEdit from './skill-edit'
import skills from './skills'
import snackbar from './snackbar'
import strategies from './strategies'
import strategy from './strategy'
import strategyCreate from './strategy-create'
import strategyEdit from './strategy-edit'
import user from './async/user'
import visibilitySelectField from './visibility-select-field'

export const rootReducer = combineReducers({
  capabilities,
  capability,
  capabilityCreate,
  capabilityEdit,
  dashboards,
  employee,
  employeeCreate,
  employeeEdit,
  employees,
  organization,
  organizationCreate,
  organizationEdit,
  organizations,
  skill,
  skillCreate,
  skillEdit,
  skills,
  snackbar,
  strategies,
  strategy,
  strategyCreate,
  strategyEdit,
  user,
  visibilitySelectField,
  
  // for react-router-redux
  routing
})