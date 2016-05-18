import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import {organizationCreate} from '../modules/async/organization-create'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {
  organizationCreateChange,
  organizationCreateReset
} from '../modules/organization-create'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

const style = {
  margin: 12
}

class OrganizationCreate extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    organizationCreateState: PropTypes.object.isRequired
  }

  changeDescription = (event) => {
    const {dispatch} = this.props

    dispatch(organizationCreateChange({description: event.target.value}))
  }

  changeTitle = (event) => {
    const {dispatch} = this.props

    dispatch(organizationCreateChange({title: event.target.value}))
  }

  create = () => {
    const {dispatch, organizationCreateState} = this.props
    const {
      description,
      title
    } = organizationCreateState

    dispatch(organizationCreate({description, title}))
  }

  reset = () => {
    const {dispatch} = this.props

    dispatch(organizationCreateReset())
  }

  render () {
    const {
      organizationCreateState
    } = this.props

    const {
      description,
      title
    } = organizationCreateState
    
    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Create an Organization' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <IconButton
              onTouchTap={() => {
                this.reset()
                browserHistory.push('/organizations')
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
                browserHistory.push('/organizations')
              }}
            />
            <RaisedButton
              label='Create'
              primary={true}
              style={style}
              onTouchTap={() => {
                this.create()
                this.reset()
                browserHistory.push('/organizations')
              }}
            />
          </div>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  organizationCreateState: state.organizationCreate
}))(OrganizationCreate)