import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {employeesRead} from '../modules/async/employees-read'
import FlatButton from 'material-ui/FlatButton'
import {main} from '../styles/common'
import RaisedButton from 'material-ui/RaisedButton'
import React, {Component, PropTypes} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Employees extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    employeesState: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch} = this.props

    dispatch(employeesRead())
  }

  renderEmployees () {
    const {employeesState} = this.props

    if (employeesState && employeesState.data && employeesState.data.length) {
      return (
        employeesState.data.map(function (employee) {
          return (
            <TableRow key={employee._id}>
              <TableRowColumn>
                <FlatButton
                  label={employee.title}
                  secondary={true}
                  onTouchTap={() => {
                    browserHistory.push(`/employees/${employee._id}`)
                  }}
                />
              </TableRowColumn>
              <TableRowColumn>{employee.description}</TableRowColumn>
            </TableRow>
          )
        })
      )
    }
  }

  render () {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Employees' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Create'
              primary={true}
              onTouchTap={() => (browserHistory.push('/employees/create'))}
            />
          </ToolbarGroup>
        </Toolbar>
        <main style={main}>
          <Table
            multiSelectable={false}
            selectable={false}
          >
            <TableHeader
              adjustForCheckbox={false}
              displaySelectAll={false}
              enableSelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn>Employee</TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              {this.renderEmployees()}
            </TableBody>
          </Table>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  employeesState: state.employees
}))(Employees)