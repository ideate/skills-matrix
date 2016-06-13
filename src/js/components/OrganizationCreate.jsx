import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {employeesRead} from '../modules/async/employees-read'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import {organizationCreate} from '../modules/async/organization-create'
import RaisedButton from 'material-ui/RaisedButton'
import Select from 'react-select'
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
  
  constructor () {
    super()

    this.state = {
      selectEmployeeValues: []
    }
  }
  
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    employeesState: PropTypes.object.isRequired,
    organizationCreateState: PropTypes.object.isRequired
  }

  changeDescription = (event) => {
    const {dispatch} = this.props

    dispatch(organizationCreateChange({description: event.target.value}))
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

    dispatch(organizationCreateChange({employees: employeeIdArray}))
  }

  changeTitle = (event) => {
    const {dispatch} = this.props

    dispatch(organizationCreateChange({title: event.target.value}))
  }
  
  componentWillMount () {
    const {dispatch} = this.props

    dispatch(employeesRead())
  }

  create = () => {
    const {dispatch, organizationCreateState} = this.props
    const {
      description,
      title,
      employees
    } = organizationCreateState

    dispatch(organizationCreate({description, title, employees}))
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
          <br />
          <div>
            {this.renderEmployees()}
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
  
  renderEmployees () {
    const {employeesState} = this.props
    const selectEmployeeOptions = []
    
    if (employeesState && employeesState.data && employeesState.data.length) {
      employeesState.data.map(function (employee) {
        selectEmployeeOptions.push({value: employee._id, label: employee.title})
      })
    }
    
    return (
      <Select
        multi={true}
        options={selectEmployeeOptions}
        placeholder='Select employees...'
        value={this.state.selectEmployeeValues}
        onChange={this.changeEmployees}
      />
    )
  }
}

export default connect((state) => ({
  employeesState: state.employees,
  organizationCreateState: state.organizationCreate
}))(OrganizationCreate)