import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import {organizationDelete} from '../modules/async/organization-delete'
import {organizationRead} from '../modules/async/organization-read'
import {organizationReset} from '../modules/organization'
import RaisedButton from 'material-ui/RaisedButton'
import Select from 'react-select'
import TextField from 'material-ui/TextField'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Organization extends Component {
  
  state = {
    open: false
  }
  
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    organizationState: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch, params} = this.props

    dispatch(organizationRead(params.id))
  }

  delete = () => {
    const {dispatch, params} = this.props

    dispatch(organizationDelete(params.id))
  }
  
  handleOpen = () => {
    this.setState({open: true})
  }
  
  handleClose = () => {
    this.setState({open: false})
  }
  
  handleDelete = () => {
    this.setState({open: false})
    this.delete()
    browserHistory.push('/organizations')
  }

  reset = () => {
    const {dispatch} = this.props

    dispatch(organizationReset())
  }

  render () {
    const {
      organizationState
    } = this.props
    
    const actions = [
      <FlatButton
        key='cancel'
        label='Cancel'
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        key='delete'
        label='Delete'
        primary={true}
        onTouchTap={this.handleDelete}
      />
    ]

    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Organization' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Edit'
              primary={true}
              onTouchTap={() => (browserHistory.push(`/organizations/${this.props.params.id}/edit`))}
            />
            <RaisedButton
              label='Delete'
              primary={false}
              onTouchTap={this.handleOpen}
            />
            <Dialog
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              Are you sure you want to delete the {organizationState.title} organization?
            </Dialog>
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
              disabled={false}
              floatingLabelText='Title'
              fullWidth={true}
              value={organizationState.title}
            />
          </div>
          <div>
            <TextField
              disabled={false}
              floatingLabelText='Description'
              fullWidth={true}
              value={organizationState.description}
            />
          </div>
          <br />
          <div>
            {this.renderEmployees(organizationState.employees)}
          </div>
        </main>
      </div>
    )
  }
  
  renderEmployees (employees) {
    const selectEmployeeValues = []

    if (employees && employees.length) {
      employees.map(function (employee) {
        selectEmployeeValues.push({value: employee._id, label: employee.title})
      })
    }
  
    return (
      <Select
        disable={true}
        multi={true}
        placeholder='No employees'
        searchable={false}
        value={selectEmployeeValues}
      />
    )
  }
  
}

export default connect((state) => ({
  organizationState: state.organization
}))(Organization)