import {browserHistory} from 'react-router'
import {capabilitiesRead} from '../modules/async/capabilities-read'
import {connect} from 'react-redux'
import {employeesRead} from '../modules/async/employees-read'
import FlatButton from 'material-ui/FlatButton'
import {main} from '../styles/common'
import MenuItem from 'material-ui/MenuItem'
import {organizationsRead} from '../modules/async/organizations-read'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import {skillsRead} from '../modules/async/skills-read'
import {strategiesRead} from '../modules/async/strategies-read'
import {dashboardsChange, dashboardsSelectReset} from '../modules/dashboards'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Dashboards extends Component {
  static propTypes = {
    dashboardsState: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentWillMount () {
    const {dispatch} = this.props

    dispatch(capabilitiesRead())
    dispatch(employeesRead())
    dispatch(organizationsRead())
    dispatch(skillsRead())
    dispatch(strategiesRead())
  }

  changeDashboardsCapabilities = (event, index, value) => {
    const {dispatch} = this.props

    dispatch(dashboardsChange({capabilitiesSelect: value}))
  }

  changeDashboardsEmployees = (event, index, value) => {
    const {dispatch} = this.props

    dispatch(dashboardsChange({employeesSelect: value}))
  }

  changeDashboardsOrganizations = (event, index, value) => {
    const {dispatch} = this.props

    dispatch(dashboardsChange({organizationsSelect: value}))
  }

  changeDashboardsSkills = (event, index, value) => {
    const {dispatch} = this.props

    dispatch(dashboardsChange({skillsSelect: value}))
  }

  changeDashboardsStrategies = (event, index, value) => {
    const {dispatch} = this.props

    dispatch(dashboardsChange({strategiesSelect: value}))
  }

  renderCapabilities () {
    const {dashboardsState} = this.props

    if (dashboardsState && dashboardsState.capabilities && dashboardsState.capabilities.length) {
      return (
        dashboardsState.capabilities.map(function (data) {
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

  renderSkills () {
    const {dashboardsState} = this.props

    if (dashboardsState && dashboardsState.skills && dashboardsState.skills.length) {
      return (
        dashboardsState.skills.map(function (data) {
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

  reset = () => {
    const {dispatch} = this.props

    dispatch(dashboardsSelectReset())
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
              floatingLabelText="Organizations"
              value={this.props.dashboardsState.organizationsSelect}
              onChange={this.changeDashboardsOrganizations}
            >
              {this.renderOrganizations()}
            </SelectField>
            <br />
            <SelectField
              floatingLabelText="Employees"
              value={this.props.dashboardsState.employeesSelect}
              onChange={this.changeDashboardsEmployees}
            >
              {this.renderEmployees()}
            </SelectField>
            <br />
            <SelectField
              floatingLabelText="Skills"
              value={this.props.dashboardsState.skillsSelect}
              onChange={this.changeDashboardsSkills}
            >
              {this.renderSkills()}
            </SelectField>
            <br />
            <SelectField
              floatingLabelText="Capabilities"
              value={this.props.dashboardsState.capabilitiesSelect}
              onChange={this.changeDashboardsCapabilities}
            >
              {this.renderCapabilities()}
            </SelectField>
            <br />
            <SelectField
              floatingLabelText="Strategies"
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
              onTouchTap={() => {
                this.reset()
              }}
            />
          </div>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  dashboardsState: state.dashboards
}))(Dashboards)