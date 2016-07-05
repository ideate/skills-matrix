import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {main} from '../styles/common'
import {organizationDelete} from '../modules/async/organization-delete'
import {organizationRead} from '../modules/async/organization-read'
import {organizationReset} from '../modules/organization'
import RaisedButton from 'material-ui/RaisedButton'
import Select from 'react-select'
import TextField from 'material-ui/TextField'
import {
  displayemployees,
  displayorganization,
  displayOrganizations,
  displayorganizations
} from '../../../config'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

const style = {
  buttonLabel: {
    fontSize: '20px',
    padding: '0px',
    textTransform: 'none'
  },
  button: {
    margin: '10px 10px 0px 0px',
    minWidth: '0px',
    textAlign: 'left'
  }
}

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
    browserHistory.push(`/${displayorganizations}`)
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
            <FlatButton
              label={`${displayOrganizations} /`}
              labelStyle={style.buttonLabel}
              style={style.button}
              onTouchTap={() => {
                browserHistory.push(`/${displayorganizations}`)
              }}
            />
            <ToolbarTitle
              text={`${organizationState.title}`}
            />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Edit'
              primary={true}
              onTouchTap={() => (browserHistory.push(`/${displayorganizations}/${this.props.params.id}/edit`))}
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
              Are you sure you want to delete this {displayorganization}?
            </Dialog>
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
        placeholder={`No ${displayemployees}`}
        searchable={false}
        value={selectEmployeeValues}
      />
    )
  }
  
}

export default connect((state) => ({
  organizationState: state.organization
}))(Organization)