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
      headerHeight: 48,
      rowHeight: 48,
      editIcon: '<i class="fa fa-pencil-square-o fa-lg"/>',
      icons: {
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
          suppressSorting: true,
          width: 15
        },
        {headerName: 'Capability', field: 'title'},
        {headerName: 'Description', field: 'description'},
        {
          headerName: 'Edit',
          field: 'edit',
          suppressSorting: true,
          width: 30
        }
      ]
      const rowData = []

      capabilitiesState.data.map(function (capability) {
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
          <div className='ag-material'
            style={this.getTableHeight()}>
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