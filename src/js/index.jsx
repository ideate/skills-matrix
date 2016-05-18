import App from './components/App'
import Capabilities from './components/Capabilities'
import Capability from './components/Capability'
import CapabilityCreate from './components/CapabilityCreate'
import CapabilityEdit from './components/CapabilityEdit'
import Dashboards from './components/Dashboards'
import Help from './components/Help'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Organizations from './components/Organizations'
import People from './components/People'
import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import Settings from './components/Settings'
import Skill from './components/Skill'
import SkillCreate from './components/SkillCreate'
import SkillEdit from './components/SkillEdit'
import Skills from './components/Skills'
import {store} from './store'
import {syncHistoryWithStore} from 'react-router-redux'
import {browserHistory, IndexRoute, Route, Router} from 'react-router'

injectTapEventPlugin()

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route
        component={App}
        path='/'
      >
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
          component={Help}
          path='help'
        />
        <Route
          component={Organizations}
          path='organizations'
        />
        <Route
          component={People}
          path='people'
        />
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
      </Route>
      <Route
        component={App}
        path='*'
      />
    </Router>
  </Provider>
), document.querySelector('.app'))