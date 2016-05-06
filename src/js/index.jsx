import App from './components/App'
import Capabilities from './components/Capabilities'
import Explore from './components/Explore'
import Help from './components/Help'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Organizations from './components/Organizations'
import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import Settings from './components/Settings'
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
          component={Capabilities}
          path='capabilities'
        />
        <Route
          component={Explore}
          path='explore'
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
          component={Settings}
          path='settings'
        />
        <Route
          component={Skills}
          path='skills'
        />
      </Route>
      <Route
        component={App}
        path='*'
      />
    </Router>
  </Provider>
), document.querySelector('.app'))