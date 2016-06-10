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
    organizationsState: PropTypes.object.isRequired
  }
  
  componentDidUpdate () {
    const grid = this.refs.grid
    
    if (grid) {
      this.handleResize(grid)
    }
  }
  
  componentWillMount () {
    const {dispatch} = this.props

    dispatch(organizationsRead())
  }
  
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
  
  handleResize (grid) {
    grid.api.sizeColumnsToFit()
  }
  
  onCellClicked (event) {
    browserHistory.push('/organizations/' + event.data.id)
  }
  
  onGridReady (grid) {
    grid.api.sizeColumnsToFit()
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
          <div className='ag-material'
            style={this.getTableHeight()}>
           {this.renderOrganizations()}
           </div>
        </main>
      </div>
    )
  }
  
  renderOrganizations () {
    const {organizationsState} = this.props
    let columnDefs = []
    const rowData = []

    if (organizationsState && organizationsState.data && organizationsState.data.length) {
      columnDefs = [
        {headerName: 'Organization', field: 'title', cellStyle: {color: '#FF4081'}},
        {headerName: 'Description', field: 'description'}
      ]

      organizationsState.data.map(function (organization) {
        rowData.push({id: organization._id, title: organization.title, description: organization.description})
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
}

export default connect((state) => ({
  organizationsState: state.organizations
}))(Organizations)