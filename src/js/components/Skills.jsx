import {AgGridReact} from 'ag-grid-react'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {main} from '../styles/common'
import RaisedButton from 'material-ui/RaisedButton'
import {skillsRead} from '../modules/async/skills-read'
import {
  displaySkill,
  displayskill,
  displaySkills,
  displayskills
} from '../../../config'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Skills extends Component {
  
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
    skillsState: PropTypes.object.isRequired
  }
  
  componentDidUpdate () {
    const grid = this.refs.grid
    
    if (grid) {
      this.handleResize(grid)
    }
  }
  
  componentWillMount () {
    const {dispatch} = this.props

    dispatch(skillsRead())
  }
  
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
  
  handleResize (grid) {
    grid.api.sizeColumnsToFit()
  }
  
  onCellClicked (event) {
    browserHistory.push(`/${displayskill}/${event.data.id}`)
  }
  
  onGridReady (grid) {
    grid.api.sizeColumnsToFit()
  }
  
  renderSkills () {
    const {skillsState} = this.props
    let columnDefs = []
    const rowData = []

    if (skillsState && skillsState.data && skillsState.data.length) {
      columnDefs = [
        {headerName: displaySkill, field: 'title', cellStyle: {color: '#FF4081'}},
        {headerName: 'Description', field: 'description'}
      ]
      
      skillsState.data.map(function (skill) {
        rowData.push({id: skill._id, title: skill.title, description: skill.description})
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
            <ToolbarTitle text={displaySkills} />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Create'
              primary={true}
              onTouchTap={() => (browserHistory.push(`/${displayskills}/create`))}
            />
          </ToolbarGroup>
        </Toolbar>
        <main style={main}>
          <div className='ag-material'
            style={this.getTableHeight()}>
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