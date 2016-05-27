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
      editIcon: '<i class="fa fa-pencil-square-o fa-lg"/>',
      icons: {
        columnRemoveFromGroup: '<i class="fa fa-remove"/>',
        filter: '<i class="fa fa-filter"/>',
        menu: '<i class="fa fa-bars"/>',
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
  
  handleResize (grid) {
    grid.api.sizeColumnsToFit()
  }
  
  onCellClicked (event) {
    if (event.value === this.state.editIcon) {
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
        }
      ]
      const rowData = []

      capabilitiesState.data.map(function (capability) {
        rowData.push({id: capability._id, title: capability.title, description: capability.description, edit: editIcon})
      })

      return (
        <AgGridReact
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
          rowSelection='multiple'
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
          <div className='ag-material'>
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