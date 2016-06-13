import {browserHistory} from 'react-router'
import {capabilitiesRead} from '../modules/async/capabilities-read'
import {connect} from 'react-redux'
import {dashboardsSearch} from '../modules/async/dashboards-search'
import {employeesRead} from '../modules/async/employees-read'
import FlatButton from 'material-ui/FlatButton'
import {main} from '../styles/common'
import MenuItem from 'material-ui/MenuItem'
import {organizationsRead} from '../modules/async/organizations-read'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import {strategiesRead} from '../modules/async/strategies-read'
import {dashboardsChange, dashboardsSelectReset} from '../modules/dashboards'
import React, {Component, PropTypes} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

const style = {
  margin: 12
}

class Dashboards extends Component {
  static propTypes = {
    dashboardsState: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  changeDashboardsEmployees = (event, index, value) => {
    const {dispatch} = this.props

    dispatch(dashboardsChange({employeesSelect: value}))
  }

  changeDashboardsOrganizations = (event, index, value) => {
    const {dispatch} = this.props

    dispatch(dashboardsChange({organizationsSelect: value}))
  }

  changeDashboardsStrategies = (event, index, value) => {
    const {dispatch} = this.props

    dispatch(dashboardsChange({strategiesSelect: value}))
  }

  componentWillMount () {
    const {dispatch} = this.props

    dispatch(capabilitiesRead())
    dispatch(employeesRead())
    dispatch(organizationsRead())
    dispatch(strategiesRead())
  }

  render () {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Dashboards' />
          </ToolbarGroup>
        </Toolbar>
        <main style={main}>
          <div>
            <SelectField
              floatingLabelText='Organizations'
              fullWidth = {true}
              value={this.props.dashboardsState.organizationsSelect}
              onChange={this.changeDashboardsOrganizations}
            >
              {this.renderOrganizations()}
            </SelectField>
            <br />
            <SelectField
              floatingLabelText='Employees'
              fullWidth = {true}
              value={this.props.dashboardsState.employeesSelect}
              onChange={this.changeDashboardsEmployees}
            >
              {this.renderEmployees()}
            </SelectField>
            <br />
            <SelectField
              floatingLabelText='Strategies'
              fullWidth = {true}
              value={this.props.dashboardsState.strategiesSelect}
              onChange={this.changeDashboardsStrategies}
            >
              {this.renderStrategies()}
            </SelectField>
            <br />
            <br />
          </div>
          <div>
            <RaisedButton
              label='Reset'
              style={style}
              onTouchTap={() => {
                this.reset()
              }}
            />
            <RaisedButton
              label='Search'
              primary={true}
              style={style}
              onTouchTap={() => {
                this.search()
              }}
            />
          </div>
          <br />
          <br />
          <div>
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
                  {this.renderTableHeader()}
                </TableRow>
              </TableHeader>
              {this.renderTableRows()}
            </Table>
          </div>
          
        </main>
      </div>
    )
  }

  renderEmployees () {
    const {dashboardsState} = this.props

    if (dashboardsState && dashboardsState.employees && dashboardsState.employees.length) {
      return (
        dashboardsState.employees.map(function (data) {
          return (
            <MenuItem
              key={data._id}
              primaryText={data.title}
              value={data._id}
            />
          )
        })
      )
    }
  }

  renderOrganizations () {
    const {dashboardsState} = this.props

    if (dashboardsState && dashboardsState.organizations && dashboardsState.organizations.length) {
      return (
        dashboardsState.organizations.map(function (data) {
          return (
            <MenuItem
              key={data._id}
              primaryText={data.title}
              value={data._id}
            />
          )
        })
      )
    }
  }

  renderStrategies () {
    const {dashboardsState} = this.props

    if (dashboardsState && dashboardsState.strategies && dashboardsState.strategies.length) {
      return (
        dashboardsState.strategies.map(function (data) {
          return (
            <MenuItem
              key={data._id}
              primaryText={data.title}
              value={data._id}
            />
          )
        })
      )
    }
  }

  renderTableHeader () {
    const {dashboardsState} = this.props

    if (dashboardsState && dashboardsState.capabilities && dashboardsState.capabilities.length) {
      return (
        dashboardsState.capabilities.map(function (capability) {
          return (
            <TableHeaderColumn key={capability._id}>
              <FlatButton
                label={capability.title}
                secondary={true}
                onTouchTap={() => {
                  browserHistory.push(`/capabilities/${capability._id}`)
                }}
              />
            </TableHeaderColumn>
          )
        })
      )
    }
  }

  renderTableRows () {
    const {dashboardsState} = this.props

    if (dashboardsState && dashboardsState.capabilities && dashboardsState.capabilities.length) {
      // GET LARGEST CAPABILITIES.SKILLS COUNT (# OF ROWS TO RENDER)
      const rows = []
      let skillsCount = 0
      
      dashboardsState.capabilities.forEach(function (capability) {
        if (capability.skills && capability.skills.length && capability.skills.length > skillsCount) {
          skillsCount = capability.skills.length
        }
      })

      for (let i = 0; i < skillsCount; i++) {
        rows.push(
          <TableRow key={i}>
            {
              dashboardsState.capabilities.map(function (capability) {
                let primary = false
                
                if (dashboardsState.skills && dashboardsState.skills.length > 0) {
                  if (capability.skills && capability.skills.length && capability.skills.length > i) {
                    if (dashboardsState.skills.indexOf(capability.skills[i]._id) > -1) {
                      primary = true
                    }
                  }
                }

                if (capability.skills && capability.skills.length && capability.skills.length > i) {
                  return (
                    <TableRowColumn>
                      <RaisedButton
                        label={capability.skills[i].title}
                        primary={primary}
                        onTouchTap={() => {
                          browserHistory.push(`/skills/${capability.skills[i]._id}`)
                        }}
                      />
                    </TableRowColumn>
                  )
                } else {
                  return (
                    <TableRowColumn/>
                  )
                }
              })
            }
          </TableRow>
        )
      }

      return (
        <TableBody
          displayRowCheckbox={false}
        >
          {rows}
        </TableBody>
      )
    }
  }

  reset = () => {
    const {dispatch} = this.props

    dispatch(dashboardsSelectReset())
  }
  
  search = () => {
    const {dashboardsState, dispatch} = this.props

    dispatch(dashboardsSearch({
      organizations: dashboardsState.organizationsSelect,
      employees: dashboardsState.employeesSelect,
      strategies: dashboardsState.strategiesSelect
    }))
  }
}

export default connect((state) => ({
  dashboardsState: state.dashboards
}))(Dashboards)