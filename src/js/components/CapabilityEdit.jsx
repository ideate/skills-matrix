import {browserHistory} from 'react-router'
import {capabilityRead} from '../modules/async/capability-read'
import {capabilityUpdate} from '../modules/async/capability-update'
import {connect} from 'react-redux'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {
  capabilityEditChange,
  capabilityEditReset
} from '../modules/capability-edit'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

const style = {
  margin: 12,
}

class CapabilityEdit extends Component {
  static propTypes = {
    capabilityEditState: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch, params} = this.props

    dispatch(capabilityRead(params.id))
  }

  changeDescription = (event) => {
    const {dispatch} = this.props

    dispatch(capabilityEditChange({description: event.target.value}))
  }

  changeTitle = (event) => {
    const {dispatch} = this.props

    dispatch(capabilityEditChange({title: event.target.value}))
  }

  reset = () => {
    const {dispatch} = this.props

    dispatch(capabilityEditReset())
  }

  update = () => {
    const {dispatch, capabilityEditState} = this.props

    dispatch(capabilityUpdate(capabilityEditState))
  }

  render () {
    const {
      capabilityEditState
    } = this.props

    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Edit a Capability' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <IconButton
              onTouchTap={() => {
                this.reset()
                browserHistory.push(`/capabilities/${this.props.params.id}`)
              }}
            >
              <NavigationClose/>
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <main style={main}>
          <div>
            <TextField
              floatingLabelText='Title'
              fullWidth={true}
              value={capabilityEditState.title}
              onChange={this.changeTitle}
            />
          </div>
          <div>
            <TextField
              floatingLabelText='Description'
              fullWidth={true}
              value={capabilityEditState.description}
              onChange={this.changeDescription}
            />
          </div>
          <div>
            <RaisedButton
              label="Cancel"
              style={style}
              onTouchTap={() => {
                this.reset()
                browserHistory.push(`/capabilities/${this.props.params.id}`)
              }}
            />
            <RaisedButton
              label="Update"
              primary={true}
              style={style}
              onTouchTap={() => {
                this.update()
                this.reset()
                browserHistory.push(`/capabilities/${this.props.params.id}`)
              }}
            />
          </div>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  capabilityEditState: state.capabilityEdit
}))(CapabilityEdit)