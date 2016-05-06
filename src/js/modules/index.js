import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'
import user from './user'

export const rootReducer = combineReducers({
  user,

  // for react-router-redux
  routing
})