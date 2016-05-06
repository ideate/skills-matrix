import ActionBuild from 'material-ui/lib/svg-icons/action/build'
import ActionExplore from 'material-ui/lib/svg-icons/action/explore'
import ActionGroupWork from 'material-ui/lib/svg-icons/action/group-work'
import ActionHelp from 'material-ui/lib/svg-icons/action/help'
import ActionInfo from 'material-ui/lib/svg-icons/action/info'
import ActionLightbulbOutline from 'material-ui/lib/svg-icons/action/lightbulb-outline'
import ActionSettings from 'material-ui/lib/svg-icons/action/settings'
import AppBar from 'material-ui/lib/app-bar'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import Divider from 'material-ui/lib/divider'
import {fetchUser} from '../modules/user'
import {GlobalStyles} from './GlobalStyles'
import IconButton from 'material-ui/lib/icon-button'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close'
import {Wrapper} from './Wrapper'
import {AppCanvas, CircularProgress} from 'material-ui'
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
                      leftIcon={<ActionExplore />}
                      primaryText="Explore"
                      onTouchTap={() => (browserHistory.push('/explore'))}
                    />
                    <MenuItem
                      leftIcon={<ActionLightbulbOutline />}
                      primaryText="Capabilities"
                      onTouchTap={() => (browserHistory.push('/capabilities'))}
                    />
                    <MenuItem
                      leftIcon={<ActionBuild />}
                      primaryText="Skills"
                      onTouchTap={() => (browserHistory.push('/skills'))}
                    />
                    <MenuItem
                      leftIcon={<ActionGroupWork />}
                      primaryText="Organizations"
                      onTouchTap={() => (browserHistory.push('/organizations'))}
                    />
                    <Divider />
                    <MenuItem
                      leftIcon={<ActionHelp />}
                      primaryText="Help"
                      onTouchTap={() => (browserHistory.push('/help'))}
                    />
                    <Divider />
                    <MenuItem
                      leftIcon={<ActionSettings />}
                      primaryText="Settings"
                      onTouchTap={() => (browserHistory.push('/settings'))}
                    />
                  </IconMenu>
                }
                showMenuIconButton={false}
                title="Skills Matrix"
              />
            {children}
          </Wrapper>
        </div>
      )
    }

    return (
      <StyleRoot>
        <AppCanvas>
          <GlobalStyles />
          {content}
        </AppCanvas>
      </StyleRoot>
    )
  }
}

export default connect((state) => ({
  user: state.user
}))(App)