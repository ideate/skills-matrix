import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {employeesRead} from '../modules/async/employees-read'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import {organizationRead} from '../modules/async/organization-read'
import {organizationUpdate} from '../modules/async/organization-update'
import RaisedButton from 'material-ui/RaisedButton'
import Select from 'react-select'
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
  
  constructor () {
    super()

    this.state = {
      selectEmployeeValues: []
    }
  }
  
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    employeesState: PropTypes.object.isRequired,
    organizationEditState: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch, params} = this.props

    dispatch(employeesRead())
    dispatch(organizationRead(params.id))
  }

  changeDescription = (event) => {
    const {dispatch} = this.props

    dispatch(organizationEditChange({description: event.target.value}))
  }
  
  changeEmployees = (selectEmployeeValues) => {
    const {dispatch} = this.props
    const employeeIdArray = []
    
    this.setState({selectEmployeeValues})

    if (selectEmployeeValues) {
      selectEmployeeValues.map(function (selectedEmployee) {
        employeeIdArray.push(selectedEmployee.value)
      })
    }
    
    dispatch(organizationEditChange({employees: employeeIdArray}))
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
          <br />
          <div>
            {this.renderEmployees(organizationEditState.employees)}
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
  
  renderEmployees (employees) {
    const {employeesState} = this.props
    const selectEmployeeValues = this.state.selectEmployeeValues
    const selectEmployeeOptions = []

    if (employees && employees.length && !selectEmployeeValues.length) {
      employees.map(function (employee) {
        selectEmployeeValues.push({_id: employee._id, title: employee.title, description: employee.description, value: employee._id, label: employee.title})
      })
    }

    if (employeesState && employeesState.data && employeesState.data.length) {
      employeesState.data.map(function (employee) {
        selectEmployeeOptions.push({_id: employee._id, title: employee.title, description: employee.description, value: employee._id, label: employee.title})
      })
    }
  
    return (
      <Select
        multi={true}
        options={selectEmployeeOptions}
        placeholder='No employees'
        value={selectEmployeeValues}
        onChange={this.changeEmployees}
      />
    )
  }
}

export default connect((state) => ({
  employeesState: state.employees,
  organizationEditState: state.organizationEdit
}))(OrganizationEdit)