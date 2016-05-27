import {AgGridReact} from 'ag-grid-react'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {main} from '../styles/common'
import {organizationsRead} from '../modules/async/organizations-read'
import RaisedButton from 'material-ui/RaisedButton'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Organizations extends Component {
  
  constructor () {
    super()

    this.state = {
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
      headerHeight: 48,
      rowHeight: 48,
      editIcon: '<i class="fa fa-pencil-square-o fa-lg"/>',
      icons: {
=======
      editIcon: '<i class="fa fa-pencil-square-o fa-lg"/>',
      icons: {
        columnRemoveFromGroup: '<i class="fa fa-remove"/>',
        filter: '<i class="fa fa-filter"/>',
        menu: '<i class="fa fa-bars"/>',
>>>>>>> Grid branch (#11)
        sortAscending: '<i class="fa fa-sort-alpha-asc"/>',
        sortDescending: '<i class="fa fa-sort-alpha-desc"/>'
      }
    }
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    organizationsState: PropTypes.object.isRequired
  }
  
  componentDidUpdate () {
    this.handleResize(this.refs.grid)
  }
  
  componentWillMount () {
    const {dispatch} = this.props

    dispatch(organizationsRead())
  }
  
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
  componentWillUnmount () {
    this.refs.grid.api.destroy()
  }
  
  getTableHeight () {
    let tableHeight = 0
    
    if (typeof this.props.organizationsState.data.length !== 'undefined') {
      tableHeight = (this.props.organizationsState.data.length * this.state.rowHeight) + this.state.headerHeight + 9
    }
    
    const tableHeightStyle = {
      height: tableHeight
    }

    return tableHeightStyle
  }
  
=======
>>>>>>> Grid branch (#11)
  handleResize (grid) {
    grid.api.sizeColumnsToFit()
  }
  
  onCellClicked (event) {
<<<<<<< e3711d0587647c2e2e94cf601c36f50021684938
    if (event.value === this.state.editIcon) {
=======
    if (event.value == this.state.editIcon) {
>>>>>>> Added ag-grid to every page
      browserHistory.push('/organizations/' + event.data.id)
    }
  }
  
  onGridReady (grid) {
    grid.api.sizeColumnsToFit()
  }
  
  renderOrganizations () {
    const {organizationsState} = this.props
    const editIcon = this.state.editIcon

    if (organizationsState && organizationsState.data && organizationsState.data.length) {
      const columnDefs = [
<<<<<<< e3711d0587647c2e2e94cf601c36f50021684938
        {
          headerName: '',
          checkboxSelection: true,
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
          suppressSorting: true,
          width: 15
        },
        {headerName: 'Organization', field: 'title'},
=======
          suppressMenu: true,
          suppressMovable: true,
          suppressResize: true,
          suppressSorting: true,
          width: 15
        },
        {headerName: 'Organization', field: 'title', cellStyle: {color: '#FF4081'}},
>>>>>>> Grid branch (#11)
        {headerName: 'Description', field: 'description'},
        {
          headerName: 'Edit',
          field: 'edit',
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
=======
          suppressMenu: true,
          suppressMovable: true,
          suppressResize: true,
>>>>>>> Grid branch (#11)
          suppressSorting: true,
          width: 20
        }
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
          {headerName: 'Organization', field: 'title', cellStyle: {color: '#FF4081'}},
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
      ]
      const rowData = []

      organizationsState.data.map(function (organization) {
        rowData.push({id: organization._id, title: organization.title, description: organization.description, edit: editIcon})
      })
      
      return (
        <AgGridReact
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
          columnDefs={columnDefs}
          enableColResize='true'
          enableFilter='true'
          enableSorting='true'
          headerHeight='48'
          icons={this.state.icons}
          ref='grid'
          rowData={rowData}
          rowHeight='48'
<<<<<<< e3711d0587647c2e2e94cf601c36f50021684938
          rowSelection='multiple'
<<<<<<< 2c88e0590c73f3cf91714f17612466c2a2af5bba
>>>>>>> Grid branch (#11)
=======
=======
          rowSelection="multiple"
>>>>>>> Added ag-grid to every page
>>>>>>> Added ag-grid to every page
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
            <ToolbarTitle text='Organizations' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Create'
              primary={true}
              onTouchTap={() => (browserHistory.push('/organizations/create'))}
            />
          </ToolbarGroup>
        </Toolbar>
        <main style={main}>
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
          <div className='ag-material'
            style={this.getTableHeight()}>
=======
          <div className='ag-material'>
>>>>>>> Grid branch (#11)
           {this.renderOrganizations()}
           </div>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  organizationsState: state.organizations
}))(Organizations)