import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import {organizationRead} from '../modules/async/organization-read'
import {organizationUpdate} from '../modules/async/organization-update'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {
  organizationEditChange,
  organizationEditReset
} from '../modules/organization-edit'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

const style = {
  margin: 12
}

class OrganizationEdit extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    organizationEditState: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch, params} = this.props

    dispatch(organizationRead(params.id))
  }

  changeDescription = (event) => {
    const {dispatch} = this.props

    dispatch(organizationEditChange({description: event.target.value}))
  }

  changeTitle = (event) => {
    const {dispatch} = this.props

    dispatch(organizationEditChange({title: event.target.value}))
  }

  reset = () => {
    const {dispatch} = this.props

    dispatch(organizationEditReset())
  }

  update = () => {
    const {dispatch, organizationEditState} = this.props

    dispatch(organizationUpdate(organizationEditState))
  }

  render () {
    const {
      organizationEditState
    } = this.props

    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Edit an Organization' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <IconButton
              onTouchTap={() => {
                this.reset()
                browserHistory.push(`/organizations/${this.props.params.id}`)
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
              value={organizationEditState.title}
              onChange={this.changeTitle}
            />
          </div>
          <div>
            <TextField
              floatingLabelText='Description'
              fullWidth={true}
              value={organizationEditState.description}
              onChange={this.changeDescription}
            />
          </div>
          <div>
            <RaisedButton
              label='Cancel'
              style={style}
              onTouchTap={() => {
                this.reset()
                browserHistory.push(`/organizations/${this.props.params.id}`)
              }}
            />
            <RaisedButton
              label='Update'
              primary={true}
              style={style}
              onTouchTap={() => {
                this.update()
                this.reset()
                browserHistory.push(`/organizations/${this.props.params.id}`)
              }}
            />
          </div>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  organizationEditState: state.organizationEdit
}))(OrganizationEdit)