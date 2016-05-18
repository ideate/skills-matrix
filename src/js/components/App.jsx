import ActionBuild from 'material-ui/svg-icons/action/build'
import ActionDashboard from 'material-ui/svg-icons/action/dashboard'
import ActionGroupWork from 'material-ui/svg-icons/action/group-work'
import ActionHelp from 'material-ui/svg-icons/action/help'
import ActionLightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import AppBar from 'material-ui/AppBar'
import AppCanvas from 'material-ui/internal/AppCanvas'
import {browserHistory} from 'react-router'
import CircularProgress from 'material-ui/CircularProgress'
import {connect} from 'react-redux'
import Divider from 'material-ui/Divider'
import {fetchUser} from '../modules/async/user'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {GlobalStyles} from './GlobalStyles'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SocialPerson from 'material-ui/svg-icons/social/person'
import {Wrapper} from './Wrapper'
import Radium, {StyleRoot} from 'radium'
import React, {Component, PropTypes} from 'react'

const style = {
  loading: {
    wrapper: {
      left: '50%',
      position: 'absolute',
      textAlign: 'center',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '15%'
    }
  }
}

@Radium
class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch} = this.props

    dispatch(fetchUser())
  }

  render () {
    const {children, user} = this.props
    let content

    if (user.isFetching) {
      content = (
        <div style={[style.loading.wrapper]}>
          <CircularProgress />
          <h1>Fetching User Data</h1>
        </div>
      )
    } else if (user.error || !user.data.authenticated) {
      content = (
        <div style={[style.loading.wrapper]}>
          <h1>{'We couldn\'t authenticate you.'}</h1>
          {(() => {
            if (!user.error) return
            const isNetworkError = user.error.message.contains('NetworkError')
            const message = isNetworkError
              ? user.error.message
              : `NetworkError ${user.error.message}`
              
            return <span>{message}</span>
          })()}
        </div>
      )
    } else {
      content = (
        <div>
          <Wrapper>
              <AppBar
                iconElementRight={
                  <IconMenu
                    anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
                    iconButtonElement={
                      <IconButton><MoreVertIcon /></IconButton>
                    }
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    <MenuItem
                      leftIcon={<ActionDashboard />}
                      primaryText='Dashboards'
                      onTouchTap={() => (browserHistory.push('/dashboards'))}
                    />
                    <MenuItem
                      leftIcon={<ActionGroupWork />}
                      primaryText='Organizations'
                      onTouchTap={() => (browserHistory.push('/organizations'))}
                    />
                    <MenuItem
                      leftIcon={<SocialPerson />}
                      primaryText='Employees'
                      onTouchTap={() => (browserHistory.push('/employees'))}
                    />
                    <MenuItem
                      leftIcon={<ActionLightbulbOutline />}
                      primaryText='Capabilities'
                      onTouchTap={() => (browserHistory.push('/capabilities'))}
                    />
                    <MenuItem
                      leftIcon={<ActionBuild />}
                      primaryText='Skills'
                      onTouchTap={() => (browserHistory.push('/skills'))}
                    />
                    <Divider />
                    <MenuItem
                      leftIcon={<ActionHelp />}
                      primaryText='Help'
                      onTouchTap={() => (browserHistory.push('/help'))}
                    />
                    <Divider />
                    <MenuItem
                      leftIcon={<ActionSettings />}
                      primaryText='Settings'
                      onTouchTap={() => (browserHistory.push('/settings'))}
                    />
                  </IconMenu>
                }
                showMenuIconButton={false}
                title='Skills Matrix'
              />
            {children}
          </Wrapper>
        </div>
      )
    }

    return (
      <StyleRoot>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <AppCanvas>
            <GlobalStyles />
            {content}
          </AppCanvas>
        </MuiThemeProvider>
      </StyleRoot>
    )
  }
}

export default connect((state) => ({
  user: state.user
}))(App)