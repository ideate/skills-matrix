import {AgGridReact} from 'ag-grid-react'
import {browserHistory} from 'react-router'
import {capabilitiesRead} from '../modules/async/capabilities-read'
import {connect} from 'react-redux'
import {main} from '../styles/common'
import RaisedButton from 'material-ui/RaisedButton'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Capabilities extends Component {
  
  constructor () {
    super()

    this.state = {
<<<<<<< 2c88e0590c73f3cf91714f17612466c2a2af5bba
<<<<<<< 68f91f56004309835cca580a0da86307993e8177
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
      headerHeight: 48,
      rowHeight: 48,
      editIcon: '<i class="fa fa-pencil-square-o fa-lg"/>',
      icons: {
=======
=======
=======
<<<<<<< e3711d0587647c2e2e94cf601c36f50021684938
>>>>>>> Added ag-grid to every page
<<<<<<< e15875efc94959e658a32e1d5f5d38209ab8b8ce
>>>>>>> Added checkboxes to grids
      editIcon: '<i class="fa fa-pencil-square-o fa-lg"/>',
=======
      editIcon: '<i class="fa fa-pencil-square-o"/>',
>>>>>>> Added checkboxes to grids
=======
      editIcon: '<i class="fa fa-pencil-square-o fa-lg"/>',
>>>>>>> Added ag-grid to every page
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
    capabilitiesState: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  
  componentDidUpdate () {
    this.handleResize(this.refs.grid)
  }
  
  componentWillMount () {
    const {dispatch} = this.props

    dispatch(capabilitiesRead())
  }
  
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
  componentWillUnmount () {
    this.refs.grid.api.destroy()
  }
  
  getTableHeight () {
    let tableHeight = 0
    
    if (typeof this.props.capabilitiesState.data.length !== 'undefined') {
      tableHeight = (this.props.capabilitiesState.data.length * this.state.rowHeight) + this.state.headerHeight + 9
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
<<<<<<< 4c7179a336d161201eb471074129ff397c1028a5
<<<<<<< e15875efc94959e658a32e1d5f5d38209ab8b8ce
    if (event.value === this.state.editIcon) {
=======
    if (event.value == this.state.editIcon) {
>>>>>>> Added checkboxes to grids
=======
    if (event.value === this.state.editIcon) {
>>>>>>> Fixes to coding style
      browserHistory.push('/capabilities/' + event.data.id)
    }
  }
  
  onGridReady (grid) {
    grid.api.sizeColumnsToFit()
  }
  
  renderCapabilities () {
    const {capabilitiesState} = this.props
    const editIcon = this.state.editIcon
    
    if (capabilitiesState && capabilitiesState.data && capabilitiesState.data.length) {
      const columnDefs = [
<<<<<<< 4c7179a336d161201eb471074129ff397c1028a5
<<<<<<< e15875efc94959e658a32e1d5f5d38209ab8b8ce
=======
>>>>>>> Fixes to coding style
        {
          headerName: '',
          checkboxSelection: true,
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
          suppressSorting: true,
          width: 15
        },
        {headerName: 'Capability', field: 'title'},
=======
          suppressMenu: true,
          suppressMovable: true,
          suppressResize: true,
          suppressSorting: true,
          width: 15
        },
        {headerName: 'Capability', field: 'title', cellStyle: {color: '#FF4081'}},
>>>>>>> Grid branch (#11)
        {headerName: 'Description', field: 'description'},
        {
          headerName: 'Edit',
          field: 'edit',
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
          suppressSorting: true,
          width: 30
=======
          suppressMenu: true,
          suppressMovable: true,
          suppressResize: true,
          suppressSorting: true,
          width: 20
>>>>>>> Grid branch (#11)
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
          {headerName: 'Capability', field: 'title', cellStyle: {color: '#FF4081'}},
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
>>>>>>> Added checkboxes to grids
=======
>>>>>>> Fixes to coding style
      ]
      const rowData = []

      capabilitiesState.data.map(function (capability) {
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
        rowData.push({id: capability._id, title: capability.title, description: capability.description, skills: capability.skills, edit: editIcon})
      })
     
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
=======
        rowData.push({id: capability._id, title: capability.title, description: capability.description, edit: editIcon})
      })

      return (
        <AgGridReact
          columnDefs={columnDefs}
          enableSorting='true'
          headerHeight='48'
          icons={this.state.icons}
          ref='grid'
          rowData={rowData}
          rowHeight='48'
<<<<<<< 4c7179a336d161201eb471074129ff397c1028a5
<<<<<<< e15875efc94959e658a32e1d5f5d38209ab8b8ce
          rowSelection='multiple'
<<<<<<< 68f91f56004309835cca580a0da86307993e8177
>>>>>>> Grid branch (#11)
=======
=======
          rowSelection="multiple"
>>>>>>> Added checkboxes to grids
<<<<<<< bbbe4d06221b46a4a8b214ee9b714e83153dcbb7
>>>>>>> Added checkboxes to grids
=======
=======
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
            <ToolbarTitle text='Capabilities' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Create'
              primary={true}
              onTouchTap={() => (browserHistory.push('/capabilities/create'))}
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
           {this.renderCapabilities()}
           </div>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  capabilitiesState: state.capabilities
}))(Capabilities)