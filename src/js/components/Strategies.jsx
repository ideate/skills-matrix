import {AgGridReact} from 'ag-grid-react'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {main} from '../styles/common'
import RaisedButton from 'material-ui/RaisedButton'
import {strategiesRead} from '../modules/async/strategies-read'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Strategies extends Component {
  
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
    strategiesState: PropTypes.object.isRequired
  }
  
  componentDidUpdate () {
    const grid = this.refs.grid
    
    if (grid) {
      this.handleResize(grid)
    }
  }
  
  componentWillMount () {
    const {dispatch} = this.props

    dispatch(strategiesRead())
  }
  
  componentWillUnmount () {
    this.refs.grid.api.destroy()
  }
  
  getTableHeight () {
    let tableHeight = 0
    
    if (typeof this.props.strategiesState.data.length !== 'undefined') {
      tableHeight = (this.props.strategiesState.data.length * this.state.rowHeight) + this.state.headerHeight + 9
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
    browserHistory.push('/strategies/' + event.data.id)
  }
  
  onGridReady (grid) {
    grid.api.sizeColumnsToFit()
  }
  
  renderStrategies () {
    const {strategiesState} = this.props
    let columnDefs = []
    const rowData = []

    if (strategiesState && strategiesState.data && strategiesState.data.length) {
      columnDefs = [
        {headerName: 'Strategy', field: 'title', cellStyle: {color: '#FF4081'}},
        {headerName: 'Description', field: 'description'}
      ]

      strategiesState.data.map(function (strategy) {
        rowData.push({id: strategy._id, title: strategy.title, description: strategy.description})
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
            <ToolbarTitle text='Strategies' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Create'
              primary={true}
              onTouchTap={() => (browserHistory.push('/strategies/create'))}
            />
          </ToolbarGroup>
        </Toolbar>
        <main style={main}>
          <div className='ag-material'
            style={this.getTableHeight()}>
           {this.renderStrategies()}
           </div>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  strategiesState: state.strategies
}))(Strategies)