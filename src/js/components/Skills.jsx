
import {AgGridReact} from 'ag-grid-react'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {main} from '../styles/common'
import RaisedButton from 'material-ui/RaisedButton'
import {skillsRead} from '../modules/async/skills-read'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Skills extends Component {
  
  constructor () {
    super()

    this.state = {
<<<<<<< 0d949244f8fb87aa265259fccf2211bcd466a475
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
      headerHeight: 48,
      rowHeight: 48,
      icons: {
=======
      editIcon: '<i class="fa fa-pencil-square-o fa-lg"/>',
      icons: {
        columnRemoveFromGroup: '<i class="fa fa-remove"/>',
        filter: '<i class="fa fa-filter"/>',
        menu: '<i class="fa fa-bars"/>',
>>>>>>> Grid branch (#11)
=======
      headerHeight: 48,
      rowHeight: 48,
      icons: {
>>>>>>> Added very rudimentary ag-grid set up on skills
        sortAscending: '<i class="fa fa-sort-alpha-asc"/>',
        sortDescending: '<i class="fa fa-sort-alpha-desc"/>'
      }
    }
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    skillsState: PropTypes.object.isRequired
  }
  
  componentDidUpdate () {
    this.handleResize(this.refs.grid)
  }
  
  componentWillMount () {
    const {dispatch} = this.props

    dispatch(skillsRead())
  }
  
<<<<<<< 0d949244f8fb87aa265259fccf2211bcd466a475
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
=======
>>>>>>> Added very rudimentary ag-grid set up on skills
  componentWillUnmount () {
    this.refs.grid.api.destroy()
  }
  
  getTableHeight () {
    let tableHeight = 0
    
    if (typeof this.props.skillsState.data.length !== 'undefined') {
      tableHeight = (this.props.skillsState.data.length * this.state.rowHeight) + this.state.headerHeight + 9
    }
    
    const tableHeightStyle = {
      height: tableHeight
    }

    return tableHeightStyle
  }
  
<<<<<<< 0d949244f8fb87aa265259fccf2211bcd466a475
=======
>>>>>>> Grid branch (#11)
=======
>>>>>>> Added very rudimentary ag-grid set up on skills
  handleResize (grid) {
    grid.api.sizeColumnsToFit()
  }
  
  onCellClicked (event) {
<<<<<<< 0d949244f8fb87aa265259fccf2211bcd466a475
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
    browserHistory.push('/skills/' + event.data.id)
=======
    if (event.value === this.state.editIcon) {
      browserHistory.push('/skills/' + event.data.id)
    }
>>>>>>> Grid branch (#11)
=======
    browserHistory.push('/skills/' + event.data.id)
>>>>>>> Added very rudimentary ag-grid set up on skills
  }
  
  onGridReady (grid) {
    grid.api.sizeColumnsToFit()
  }
  
  renderSkills () {
    const {skillsState} = this.props

    if (skillsState && skillsState.data && skillsState.data.length) {
      const columnDefs = [
<<<<<<< 0d949244f8fb87aa265259fccf2211bcd466a475
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
        {headerName: 'Skill', field: 'title', cellStyle: {color: '#FF4081'}},
        {headerName: 'Description', field: 'description'}
      ]
      const rowData = []
      
      skillsState.data.map(function (skill) {
        rowData.push({id: skill._id, title: skill.title, description: skill.description})
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
=======
>>>>>>> Added very rudimentary ag-grid set up on skills
        {headerName: 'Skill', field: 'title', cellStyle: {color: '#FF4081'}},
        {headerName: 'Description', field: 'description'}
      ]
      const rowData = []
      
      skillsState.data.map(function (skill) {
<<<<<<< 0d949244f8fb87aa265259fccf2211bcd466a475
        rowData.push({id: skill._id, title: skill.title, description: skill.description, edit: editIcon})
>>>>>>> Grid branch (#11)
=======
        rowData.push({id: skill._id, title: skill.title, description: skill.description})
>>>>>>> Added very rudimentary ag-grid set up on skills
      })
      
      return (
        <AgGridReact
<<<<<<< 0d949244f8fb87aa265259fccf2211bcd466a475
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
          columnDefs={columnDefs}
          enableSorting='true'
          headerHeight={this.state.headerHeight}
          icons={this.state.icons}
          ref='grid'
          rowData={rowData}
          rowHeight={this.state.rowHeight}
          suppressMovableColumns='true'
=======
          autoResize='true'
=======
>>>>>>> Added very rudimentary ag-grid set up on skills
          columnDefs={columnDefs}
          enableSorting='true'
          headerHeight={this.state.headerHeight}
          icons={this.state.icons}
          ref='grid'
          rowData={rowData}
<<<<<<< 0d949244f8fb87aa265259fccf2211bcd466a475
          rowHeight='48'
          rowSelection='multiple'
>>>>>>> Grid branch (#11)
=======
          rowHeight={this.state.rowHeight}
          suppressMovableColumns='true'
>>>>>>> Added very rudimentary ag-grid set up on skills
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
            <ToolbarTitle text='Skills' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Create'
              primary={true}
              onTouchTap={() => (browserHistory.push('/skills/create'))}
            />
          </ToolbarGroup>
        </Toolbar>
        <main style={main}>
<<<<<<< 0d949244f8fb87aa265259fccf2211bcd466a475
<<<<<<< 727295fa8df86cb572d8ccab2e85acbad3b4f123
          <div className='ag-material'
            style={this.getTableHeight()}>
=======
          <div className='ag-material'>
>>>>>>> Grid branch (#11)
=======
          <div className='ag-material'
            style={this.getTableHeight()}>
>>>>>>> Added very rudimentary ag-grid set up on skills
           {this.renderSkills()}
           </div>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  skillsState: state.skills
}))(Skills)