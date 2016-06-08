import App from './components/App'
import Capabilities from './components/Capabilities'
import Capability from './components/Capability'
import CapabilityCreate from './components/CapabilityCreate'
import CapabilityEdit from './components/CapabilityEdit'
import Dashboards from './components/Dashboards'
import Employee from './components/Employee'
import EmployeeCreate from './components/EmployeeCreate'
import EmployeeEdit from './components/EmployeeEdit'
import Employees from './components/Employees'
import Help from './components/Help'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Organization from './components/Organization'
import OrganizationCreate from './components/OrganizationCreate'
import OrganizationEdit from './components/OrganizationEdit'
import Organizations from './components/Organizations'
import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import Settings from './components/Settings'
import Skill from './components/Skill'
import SkillCreate from './components/SkillCreate'
import SkillEdit from './components/SkillEdit'
import Skills from './components/Skills'
import {store} from './store'
import Strategies from './components/Strategies'
import Strategy from './components/Strategy'
import StrategyCreate from './components/StrategyCreate'
import StrategyEdit from './components/StrategyEdit'
import {syncHistoryWithStore} from 'react-router-redux'
import {browserHistory, IndexRedirect, IndexRoute, Route, Router} from 'react-router'

injectTapEventPlugin()

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route
        component={App}
        path='/'
      >
        <IndexRedirect
          to="dashboards"
        />
        <Route
          path='capabilities'
        >
          <IndexRoute
            component={Capabilities}
          />
          <Route
            component={CapabilityCreate}
            path='create'
          />
          <Route
            component={Capability}
            path=':id'
          />
          <Route
            component={CapabilityEdit}
            path=':id/edit'
          />
        </Route>
        <Route
          component={Dashboards}
          path='dashboards'
        />
        <Route
          path='employees'
        >
          <IndexRoute
            component={Employees}
          />
          <Route
            component={EmployeeCreate}
            path='create'
          />
          <Route
            component={Employee}
            path=':id'
          />
          <Route
            component={EmployeeEdit}
            path=':id/edit'
          />
        </Route>
        
        <Route
          component={Help}
          path='help'
        />
        <Route
          path='organizations'
        >
          <IndexRoute
            component={Organizations}
          />
          <Route
            component={OrganizationCreate}
            path='create'
          />
          <Route
            component={Organization}
            path=':id'
          />
          <Route
            component={OrganizationEdit}
            path=':id/edit'
          />
        </Route>
        <Route
          component={Settings}
          path='settings'
        />
        <Route
          path='skills'
        >
          <IndexRoute
            component={Skills}
          />
          <Route
            component={SkillCreate}
            path='create'
          />
          <Route
            component={Skill}
            path=':id'
          />
          <Route
            component={SkillEdit}
            path=':id/edit'
          />
        </Route>
        <Route
          path='strategies'
        >
          <IndexRoute
            component={Strategies}
          />
          <Route
            component={StrategyCreate}
            path='create'
          />
          <Route
            component={Strategy}
            path=':id'
          />
          <Route
            component={StrategyEdit}
            path=':id/edit'
          />
        </Route>
      </Route>
      <Route
        component={App}
        path='*'
      />
    </Router>
  </Provider>
), document.querySelector('.app'))