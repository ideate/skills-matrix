import {AgGridReact} from 'ag-grid-react'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import {ag, main} from '../styles/common'
import RaisedButton from 'material-ui/RaisedButton'
import {skillsRead} from '../modules/async/skills-read'
import React, {Component, PropTypes} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Skills extends Component {

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
  
  handleResize (grid) {
    grid.api.sizeColumnsToFit()
  }
  
  onCellClicked(event) {
      browserHistory.push(`/skills/` + event.data.id)
  }
  
  onGridReady(grid) {
    grid.api.sizeColumnsToFit()
  }

  renderSkills () {
    const {skillsState} = this.props

    if (skillsState && skillsState.data && skillsState.data.length) {
      const columnDefs = [
          {headerName: "Skill", field: "title"},
          {headerName: "Description", field: "description"}
      ]
      const rowData = []

      skillsState.data.map(function (skill) {
        rowData.push({id: skill._id, title: skill.title, description: skill.description});
      })
      
      return (
        <AgGridReact
          autoResize="true"
          columnDefs={columnDefs}
          enableColResize="true"
          enableFilter="true"
          enableSorting="true"
          ref='grid'
          rowData={rowData}
          
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
          <div className="ag-fresh"
            style={ag}>
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