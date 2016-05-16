import App from './components/App'
import Capabilities from './components/Capabilities'
import Dashboards from './components/Dashboards'
import Help from './components/Help'
import {IndexRoute} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Organizations from './components/Organizations'
import People from './components/People'
import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import Settings from './components/Settings'
import Skill from './components/Skill'
import Skills from './components/Skills'
import SkillsCreate from './components/SkillsCreate'
import {store} from './store'
import {syncHistoryWithStore} from 'react-router-redux'
import {browserHistory, Route, Router} from 'react-router'

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
          component={Capabilities}
          path='capabilities'
        />
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
            component={SkillsCreate}
            path='create'
          />
          <Route
            component={Skill}
            path=':id'
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