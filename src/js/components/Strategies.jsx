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
    dispatch: PropTypes.func.isRequired,
    strategiesState: PropTypes.object.isRequired
  }
  
  componentDidUpdate () {
    this.handleResize(this.refs.grid)
  }
  
  componentWillMount () {
    const {dispatch} = this.props

    dispatch(strategiesRead())
  }
  
  handleResize (grid) {
    grid.api.sizeColumnsToFit()
  }
  
  onCellClicked (event) {
    if (event.value === this.state.editIcon) {
      browserHistory.push('/strategies/' + event.data.id)
    }
  }
  
  onGridReady (grid) {
    grid.api.sizeColumnsToFit()
  }
  
  renderStrategies () {
    const {strategiesState} = this.props
    const editIcon = this.state.editIcon

    if (strategiesState && strategiesState.data && strategiesState.data.length) {
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
        {headerName: 'Strategy', field: 'title', cellStyle: {color: '#FF4081'}},
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

      strategiesState.data.map(function (strategy) {
        rowData.push({id: strategy._id, title: strategy.title, description: strategy.description, edit: editIcon})
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
          <div className='ag-material'>
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