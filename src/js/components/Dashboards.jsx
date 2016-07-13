import {browserHistory} from 'react-router'
import {capabilitiesRead} from '../modules/async/capabilities-read'
import {connect} from 'react-redux'
import {dashboardsSearch} from '../modules/async/dashboards-search'
import {dashboardsStrategiesRead} from '../modules/async/dashboards-strategies-read'
import {dashboardsStrategiesReset} from '../modules/dashboards-strategies'
import {employeesRead} from '../modules/async/employees-read'
import FlatButton from 'material-ui/FlatButton'
import {main} from '../styles/common'
import {organizationsRead} from '../modules/async/organizations-read'
import RaisedButton from 'material-ui/RaisedButton'
import Select from 'react-select'
import {strategiesRead} from '../modules/async/strategies-read'
import VisibilitySelectField from './VisibilitySelectField'
import {Card, CardHeader} from 'material-ui/Card'
import {dashboardsChange, dashboardsSelectReset} from '../modules/dashboards'
import {
  displaycapabilities,
  displayemployees,
  displayorganizations,
  displayskills,
  displaystrategies
} from '../../../config'
import React, {Component, PropTypes} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'
import {
  visibilitySelectFieldChange,
  visibilitySelectFieldReset
} from '../modules/visibility-select-field'

const style = {
  buttonLabel: {
    padding: '0px'
  },
  button: {
    height: 'inherit',
    lineHeight: 'inherit',
    whiteSpace: 'normal',
    width: '100%'
  },
  grid: {
    float: 'right',
    width: '79%'
  },
  header: {
    padding: '0px',
    textAlign: 'center'
  },
  margin: {
    margin: 12
  },
  nav: {
    float: 'left',
    width: '20%'
  },
  table: {
    padding: '.2em'
  },
  title: {
    padding: '10px'
  },
  text: {
    paddingRight: '0px'
  }
}

class Dashboards extends Component {
  static propTypes = {
    dashboardsState: PropTypes.object.isRequired,
    dashboardsStrategiesState: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    visibilitySelectFieldState: PropTypes.object.isRequired
  }

  changeDashboardsEmployees = (employeeSelect) => {
    const {dispatch} = this.props
    const employeeSkills = []
    
    if (employeeSelect) {
      employeeSelect.map(function (selectedSkill) {
        employeeSkills.push(selectedSkill.value)
      })
    }

    dispatch(dashboardsChange({employeesSelect: employeeSkills}))
  }

  changeDashboardsOrganizations = (organizationSelect) => {
    const {dispatch} = this.props
    const organizationSkills = []
    
    if (organizationSelect) {
      organizationSelect.map(function (selectedSkill) {
        organizationSkills.push(selectedSkill.value)
      })
    }

    dispatch(dashboardsChange({organizationsSelect: organizationSkills}))
  }

  changeDashboardsStrategies = (strategySelect) => {
    const {dispatch} = this.props
    const strategySkills = []
    
    if (strategySelect) {
      strategySelect.map(function (selectedSkill) {
        strategySkills.push(selectedSkill.value)
      })
    }

    dispatch(dashboardsChange({strategiesSelect: strategySkills}))
  }

  componentWillMount () {
    const {dispatch} = this.props

    dispatch(capabilitiesRead())
    dispatch(employeesRead())
    dispatch(organizationsRead())
    dispatch(strategiesRead())
    dispatch(visibilitySelectFieldReset())
    dispatch(visibilitySelectFieldChange({disabled: false}))
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
          <div style={style.nav}>
            <h3>Search fields</h3>
            {this.renderOrganizations()}
            {this.renderEmployees()}
            <h3>Filter results</h3>
            <VisibilitySelectField />
            <h3>Apply layers</h3>
            {this.renderStrategies()}
            <br />
            <div>
              <RaisedButton
                label='Reset'
                style={style.margin}
                onTouchTap={() => {
                  this.reset()
                }}
              />
              <RaisedButton
                label='Search'
                primary={true}
                style={style.margin}
                onTouchTap={() => {
                  this.search()
                }}
              />
            </div>
          </div>
          <div style={style.grid}>
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
    const selectEmployeeOptions = []

    if (dashboardsState && dashboardsState.employees && dashboardsState.employees.length) {
      dashboardsState.employees.map(function (data) {
        selectEmployeeOptions.push({value: data._id, label: data.title})
      })
      
      return (
        <Select
          multi={true}
          options={selectEmployeeOptions}
          placeholder={`Select ${displayemployees}`}
          value={this.props.dashboardsState.employeesSelect}
          onChange={this.changeDashboardsEmployees}
        />
        )
    }
  }

  renderOrganizations () {
    const {dashboardsState} = this.props
    const selectOrganizationOptions = []

    if (dashboardsState && dashboardsState.organizations && dashboardsState.organizations.length) {
      dashboardsState.organizations.map(function (data) {
        selectOrganizationOptions.push({value: data._id, label: data.title})
      })
      
      return (
        <Select
          multi={true}
          options={selectOrganizationOptions}
          placeholder={`Select ${displayorganizations}`}
          value={this.props.dashboardsState.organizationsSelect}
          onChange={this.changeDashboardsOrganizations}
        />
        )
    }
  }

  renderStrategies () {
    const {dashboardsState} = this.props
    const selectStrategyOptions = []

    if (dashboardsState && dashboardsState.strategies && dashboardsState.strategies.length) {
      dashboardsState.strategies.map(function (data) {
        selectStrategyOptions.push({value: data._id, label: data.title})
      })
      
      return (
        <Select
          multi={true}
          options={selectStrategyOptions}
          placeholder={`Select ${displaystrategies}`}
          value={this.props.dashboardsState.strategiesSelect}
          onChange={this.changeDashboardsStrategies}
        />
        )
    }
  }

  renderTableHeader () {
    const {dashboardsState} = this.props

    if (dashboardsState && dashboardsState.capabilities && dashboardsState.capabilities.length) {
      return (
        dashboardsState.capabilities.map(function (capability) {
          return (
            <TableHeaderColumn key={capability._id}
              style={style.header}>
              <FlatButton
                label={capability.title}
                labelStyle={style.buttonLabel}
                secondary={true}
                style={style.button}
                onTouchTap={() => {
                  browserHistory.push(`/${displaycapabilities}/${capability._id}`)
                }}
              />
            </TableHeaderColumn>
          )
        })
      )
    }
  }

  renderTableRows () {
    const {dashboardsState, dashboardsStrategiesState} = this.props
    
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
                let color = ''
                
                let cardStyle = {
                  height: '6em',
                  textAlign: 'center',
                  width: '100%'
                }
      
                if (dashboardsState.skills && dashboardsState.skills.length > 0) {
                  if (capability.skills && capability.skills.length && capability.skills.length > i) {
                    if (dashboardsState.skills.indexOf(capability.skills[i]._id) > -1) {
                      cardStyle = {...cardStyle,
                        backgroundColor: '#00BCD4'
                      }
                      color = 'white'
                    }
                  }
                }
                
                if (dashboardsStrategiesState.skills && dashboardsStrategiesState.skills.length > 0) {
                  if (capability.skills && capability.skills.length && capability.skills.length > i) {
                    if (dashboardsStrategiesState.skills.indexOf(capability.skills[i]._id) > -1) {
                      cardStyle = {...cardStyle,
                        border: '.25em solid #FF4081'}
                    }
                  }
                }

                if (capability.skills && capability.skills.length && capability.skills.length > i) {
                  return (
                      <TableRowColumn style={style.table}>
                        <Card
                          style={cardStyle}
                          onTouchTap={() => {
                            browserHistory.push(`/${displayskills}/${capability.skills[i]._id}`)
                          }}
                        >
                          <CardHeader
                            style={style.title}
                            textStyle={style.text}
                            title={capability.skills[i].title}
                            titleColor={color}
                          />
                        </Card>
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
    dispatch(dashboardsStrategiesReset())
    dispatch(visibilitySelectFieldReset())
    dispatch(visibilitySelectFieldChange({disabled: false}))
  }
  
  search = () => {
    const {
      dashboardsState,
      dispatch,
      visibilitySelectFieldState
    } = this.props

    dispatch(dashboardsSearch({
      organizations: dashboardsState.organizationsSelect,
      employees: dashboardsState.employeesSelect,
      visibility: visibilitySelectFieldState.visibility
    }))

    dispatch(dashboardsStrategiesRead({
      strategies: dashboardsState.strategiesSelect
    }))
  }
}

export default connect((state) => ({
  dashboardsState: state.dashboards,
  dashboardsStrategiesState: state.dashboardsStrategies,
  visibilitySelectFieldState: state.visibilitySelectField
}))(Dashboards)
