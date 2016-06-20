import {AgGridReact} from 'ag-grid-react'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {employeesRead} from '../modules/async/employees-read'
import {main} from '../styles/common'
import RaisedButton from 'material-ui/RaisedButton'
import {
  displayEmployee,
  displayemployees,
  displayEmployees
} from '../../../config'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Employees extends Component {
  
  constructor () {
    super()

    this.state = {
      headerHeight: 48,
      rowHeight: 48,
      icons: {
        sortAscending: '<i class="fa fa-sort-alpha-asc"/>',
        sortDescending: '<i class="fa fa-sort-alpha-desc"/>'
      }
    }
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    employeesState: PropTypes.object.isRequired
  }
  
  componentDidUpdate () {
    const grid = this.refs.grid
    
    if (grid) {
      this.handleResize(grid)
    }
  }
  
  componentWillMount () {
    const {dispatch} = this.props

    dispatch(employeesRead())
  }
  
  componentWillUnmount () {
    this.refs.grid.api.destroy()
  }
  
  getTableHeight () {
    let tableHeight = 0
    
    if (typeof this.props.employeesState.data.length !== 'undefined') {
      tableHeight = (this.props.employeesState.data.length * this.state.rowHeight) + this.state.headerHeight + 9
    }
    
    const tableHeightStyle = {
      height: tableHeight
    }

    return tableHeightStyle
  }
  
  handleResize (grid) {
    grid.api.sizeColumnsToFit()
  }
  
  onCellClicked (event) {
    browserHistory.push(`/${displayemployees}/${event.data.id}`)
  }
  
  onGridReady (grid) {
    grid.api.sizeColumnsToFit()
  }
  
  renderEmployees () {
    const {employeesState} = this.props
    let columnDefs = []
    const rowData = []

    if (employeesState && employeesState.data && employeesState.data.length) {
      columnDefs = [
        {headerName: displayEmployee, field: 'title', cellStyle: {color: '#FF4081'}},
        {headerName: 'Description', field: 'description'}
      ]

      employeesState.data.map(function (employee) {
        rowData.push({id: employee._id, title: employee.title, description: employee.description})
      })
    }
      
    return (
      <AgGridReact
        columnDefs={columnDefs}
        enableSorting='true'
        headerHeight={this.state.headerHeight}
        icons={this.state.icons}
        ref='grid'
        rowData={rowData}
        rowHeight={this.state.rowHeight}
        rowSelection='multiple'
        suppressMovableColumns='true'
        onCellClicked={this.onCellClicked.bind(this)}
        onGridReady={this.onGridReady.bind(this)}
      />
    )
  }

  render () {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text={displayEmployees} />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Create'
              primary={true}
              onTouchTap={() => (browserHistory.push(`/${displayemployees}/create`))}
            />
          </ToolbarGroup>
        </Toolbar>
        <main style={main}>
          <div className='ag-material'
            style={this.getTableHeight()}>
           {this.renderEmployees()}
           </div>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  employeesState: state.employees
}))(Employees)