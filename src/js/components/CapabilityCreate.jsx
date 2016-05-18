import {browserHistory} from 'react-router'
import {capabilityCreate} from '../modules/async/capability-create'
import {connect} from 'react-redux'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {
  capabilityCreateChange,
  capabilityCreateReset
} from '../modules/capability-create'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

const style = {
  margin: 12
}

class CapabilityCreate extends Component {
  static propTypes = {
    capabilityCreateState: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  changeDescription = (event) => {
    const {dispatch} = this.props

    dispatch(capabilityCreateChange({description: event.target.value}))
  }

  changeTitle = (event) => {
    const {dispatch} = this.props

    dispatch(capabilityCreateChange({title: event.target.value}))
  }

  create = () => {
    const {dispatch, capabilityCreateState} = this.props
    const {
      description,
      title
    } = capabilityCreateState

    dispatch(capabilityCreate({description, title}))
  }

  reset = () => {
    const {dispatch} = this.props

    dispatch(capabilityCreateReset())
  }

  render () {
    const {
      capabilityCreateState
    } = this.props

    const {
      description,
      title
    } = capabilityCreateState
    
    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Create a Capability' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <IconButton
              onTouchTap={() => {
                this.reset()
                browserHistory.push('/capabilities')
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
              value={title}
              onChange={this.changeTitle}
            />
          </div>
          <div>
            <TextField
              floatingLabelText='Description'
              fullWidth={true}
              value={description}
              onChange={this.changeDescription}
            />
          </div>
          <div>
            <RaisedButton
              label='Cancel'
              style={style}
              onTouchTap={() => {
                this.reset()
                browserHistory.push('/capabilities')
              }}
            />
            <RaisedButton
              label='Create'
              primary={true}
              style={style}
              onTouchTap={() => {
                this.create()
                this.reset()
                browserHistory.push('/capabilities')
              }}
            />
          </div>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  capabilityCreateState: state.capabilityCreate
}))(CapabilityCreate)