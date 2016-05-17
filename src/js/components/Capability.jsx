import {browserHistory} from 'react-router'
import {capabilityDelete} from '../modules/async/capability-delete'
import {capabilityRead} from '../modules/async/capability-read'
import {connect} from 'react-redux'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Capability extends Component {
  static propTypes = {
    capabilityState: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch, params} = this.props

    dispatch(capabilityRead(params.id))
  }

  delete = () => {
    const {dispatch, params} = this.props

    dispatch(capabilityDelete(params.id))
  }

  render () {
    const {
      capabilityState
    } = this.props

    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Capability' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Edit'
              primary={true}
              onTouchTap={() => (browserHistory.push(`/capabilities/${this.props.params.id}/edit`))}
            />
            <RaisedButton
              label='Delete'
              primary={false}
              onTouchTap={() => {
                browserHistory.push('/capabilities')
                this.delete()
              }}
            />
          
            <IconButton
              onTouchTap={() => {
                browserHistory.push('/capabilities')
                this.reset()
              }}
            >
              <NavigationClose/>
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <main style={main}>
          <div>
            <TextField
              disabled={false}
              floatingLabelText='Title'
              fullWidth={true}
              value={capabilityState.title}
            />
          </div>
          <div>
            <TextField
              disabled={false}
              floatingLabelText='Description'
              fullWidth={true}
              value={capabilityState.description}
            />
          </div>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  capabilityState: state.capability
}))(Capability)