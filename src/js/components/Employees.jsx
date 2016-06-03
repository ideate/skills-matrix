import {AgGridReact} from 'ag-grid-react'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {employeesRead} from '../modules/async/employees-read'
import {main} from '../styles/common'
import RaisedButton from 'material-ui/RaisedButton'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Employees extends Component {
  
  constructor () {
    super()

    this.state = {
<<<<<<< 533c859894aa613c8db24284e3eca3aa73f91faf
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
      headerHeight: 48,
      rowHeight: 48,
      editIcon: '<i class="fa fa-pencil-square-o fa-lg"/>',
      icons: {
<<<<<<< d24e7720a9ed67fe5835529cefef06d0b2cb157a
=======
=======
      headerHeight: 48,
      rowHeight: 48,
>>>>>>> Fixes #12. Added dynamic sizing for the ag-grid height, removed some unused css from common.js
      editIcon: '<i class="fa fa-pencil-square-o fa-lg"/>',
      icons: {
        columnRemoveFromGroup: '<i class="fa fa-remove"/>',
        filter: '<i class="fa fa-filter"/>',
        menu: '<i class="fa fa-bars"/>',
>>>>>>> Grid branch (#11)
=======
>>>>>>> Added ag-grid to capabilities for selection
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
    this.handleResize(this.refs.grid)
  }
  
  componentWillMount () {
    const {dispatch} = this.props

    dispatch(employeesRead())
  }
  
<<<<<<< 533c859894aa613c8db24284e3eca3aa73f91faf
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
  componentWillUnmount () {
    this.refs.grid.api.destroy()
  }
  
  getTableHeight () {
    let tableHeight = 0
    
    if (typeof this.props.employeesState.data.length !== 'undefined') {
      tableHeight = (this.props.employeesState.data.length * this.state.rowHeight) + this.state.headerHeight + 9
    }
=======
  getTableHeight () {
    const tableHeight = (this.props.employeesState.data.length * this.state.rowHeight) + this.state.headerHeight + 9
>>>>>>> Fixes #12. Added dynamic sizing for the ag-grid height, removed some unused css from common.js
    
    const tableHeightStyle = {
      height: tableHeight
    }

    return tableHeightStyle
  }
  
<<<<<<< 533c859894aa613c8db24284e3eca3aa73f91faf
=======
>>>>>>> Grid branch (#11)
=======
>>>>>>> Fixes #12. Added dynamic sizing for the ag-grid height, removed some unused css from common.js
  handleResize (grid) {
    grid.api.sizeColumnsToFit()
  }
  
  onCellClicked (event) {
<<<<<<< 4c7179a336d161201eb471074129ff397c1028a5
<<<<<<< e3711d0587647c2e2e94cf601c36f50021684938
    if (event.value === this.state.editIcon) {
=======
    if (event.value == this.state.editIcon) {
>>>>>>> Added ag-grid to every page
=======
    if (event.value === this.state.editIcon) {
>>>>>>> Fixes to coding style
      browserHistory.push('/employees/' + event.data.id)
    }
  }
  
  onGridReady (grid) {
    grid.api.sizeColumnsToFit()
  }
  
  renderEmployees () {
    const {employeesState} = this.props
    const editIcon = this.state.editIcon

    if (employeesState && employeesState.data && employeesState.data.length) {
      const columnDefs = [
<<<<<<< 4c7179a336d161201eb471074129ff397c1028a5
<<<<<<< e3711d0587647c2e2e94cf601c36f50021684938
=======
>>>>>>> Fixes to coding style
        {
          headerName: '',
          checkboxSelection: true,
<<<<<<< d24e7720a9ed67fe5835529cefef06d0b2cb157a
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
          suppressSorting: true,
          width: 15
        },
        {headerName: 'Employee', field: 'title'},
=======
          suppressMenu: true,
          suppressMovable: true,
          suppressResize: true,
=======
>>>>>>> Added ag-grid to capabilities for selection
          suppressSorting: true,
          width: 15
        },
<<<<<<< b661d64a0aec46adb631910fbbdbf00740d1e2ef
        {headerName: 'Employee', field: 'title', cellStyle: {color: '#FF4081'}},
>>>>>>> Grid branch (#11)
=======
        {headerName: 'Employee', field: 'title'},
>>>>>>> Latest ag-grid updates to each page to clean up the display some and trim down unnecessary code snippets
        {headerName: 'Description', field: 'description'},
        {
          headerName: 'Edit',
          field: 'edit',
<<<<<<< d24e7720a9ed67fe5835529cefef06d0b2cb157a
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
=======
          suppressMenu: true,
          suppressMovable: true,
          suppressResize: true,
>>>>>>> Grid branch (#11)
=======
>>>>>>> Added ag-grid to capabilities for selection
          suppressSorting: true,
          width: 20
        }
<<<<<<< 4c7179a336d161201eb471074129ff397c1028a5
=======
          {
            headerName: '',
            checkboxSelection: true,
            suppressMenu: true,
            suppressMovable: true,
            suppressResize: true,
            suppressSorting: true,
            width: 15
          },
          {headerName: 'Employee', field: 'title', cellStyle: {color: '#FF4081'}},
          {headerName: 'Description', field: 'description'},
          {
            headerName: 'Edit',
            field: 'edit',
            suppressMenu: true,
            suppressMovable: true,
            suppressResize: true,
            suppressSorting: true,
            width: 20
          },
>>>>>>> Added ag-grid to every page
=======
>>>>>>> Fixes to coding style
      ]
      const rowData = []

      employeesState.data.map(function (employee) {
        rowData.push({id: employee._id, title: employee.title, description: employee.description, edit: editIcon})
      })
      
      return (
        <AgGridReact
<<<<<<< f83e801b16e44e61232f83dc8df6451bc3e0f2d5
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
          columnDefs={columnDefs}
          enableSorting='true'
          headerHeight={this.state.headerHeight}
          icons={this.state.icons}
          ref='grid'
          rowData={rowData}
          rowHeight={this.state.rowHeight}
          rowSelection='multiple'
          suppressMovableColumns='true'
=======
          autoResize='true'
=======
>>>>>>> Fixes #20 and #13, removing ag-filters menu and fixing the ag-grid header font to be sans-serif
          columnDefs={columnDefs}
          enableSorting='true'
          headerHeight={this.state.headerHeight}
          icons={this.state.icons}
          ref='grid'
          rowData={rowData}
<<<<<<< 219f2baf49a0cf5ba055321bc07c51554febe6f9
          rowHeight='48'
<<<<<<< 4c7179a336d161201eb471074129ff397c1028a5
<<<<<<< e3711d0587647c2e2e94cf601c36f50021684938
          rowSelection='multiple'
<<<<<<< 2c88e0590c73f3cf91714f17612466c2a2af5bba
>>>>>>> Grid branch (#11)
=======
=======
          rowSelection="multiple"
>>>>>>> Added ag-grid to every page
<<<<<<< bbbe4d06221b46a4a8b214ee9b714e83153dcbb7
>>>>>>> Added ag-grid to every page
=======
=======
=======
          rowHeight={this.state.rowHeight}
>>>>>>> Fixes #12. Added dynamic sizing for the ag-grid height, removed some unused css from common.js
          rowSelection='multiple'
<<<<<<< 1ff0d78f1e591543fd4ac55225ceca607e71b3e2
>>>>>>> Fixes to coding style
<<<<<<< f83e801b16e44e61232f83dc8df6451bc3e0f2d5
>>>>>>> Fixes to coding style
=======
=======
          suppressMovableColumns='true'
>>>>>>> Fixes #20 and #13, removing ag-filters menu and fixing the ag-grid header font to be sans-serif
>>>>>>> Fixes #20 and #13, removing ag-filters menu and fixing the ag-grid header font to be sans-serif
          onCellClicked={this.onCellClicked.bind(this)}
          onGridReady={this.onGridReady.bind(this)}
        />
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
<<<<<<< 533c859894aa613c8db24284e3eca3aa73f91faf
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
          <div className='ag-material'
            style={this.getTableHeight()}>
=======
          <div className='ag-material'>
>>>>>>> Grid branch (#11)
=======
          <div className='ag-material'
            style={this.getTableHeight()}>
>>>>>>> Fixes #12. Added dynamic sizing for the ag-grid height, removed some unused css from common.js
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