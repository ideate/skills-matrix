import {AgGridReact} from 'ag-grid-react'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import {main} from '../styles/common'
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

  componentWillMount () {
    const {dispatch} = this.props

    dispatch(skillsRead())
  }
  
 onGridReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
  }
  
  onRowSelected(event) {
    console.log('onRowSelected: ' + event.node.data.name);
  }
  
  onCellClicked(event) {
    console.log('onCellClicked: ' + event.data.name + ', col ' + event.colIndex);
  }

  renderSkills () {
    const {skillsState} = this.props
    
    console.log(skillsState.data);
    console.log(skillsState.data[0]);
    
    if (skillsState && skillsState.data && skillsState.data.length) {
      var columnDefs = [
          {headerName: "Skill", field: "title"},
          {headerName: "Description", field: "description"}
      ]
      var rowData = []/*
          {title: "Toyota", description: "Celica"},
          {title: "Ford", description: "Mondeo"}
      ];
      /**/
      skillsState.data.map(function (skill) {
        rowData.push({title: skill.title, description: skill.description});
      })
     
      console.log(columnDefs);
      console.log(rowData);
      
      return (
        <AgGridReact
          //TODO add back in all these events
          // listen for events with React callbacks
          //onRowSelected={this.onRowSelected.bind(this)}
          //onCellClicked={this.onCellClicked.bind(this)}
  
          // binding to properties within React State or Props
          //showToolPanel={this.state.showToolPanel}
          //quickFilterText={this.state.quickFilterText}
          //icons={this.state.icons}
          
          //Object { _id: "573cb55b6f6a0a370a7b9905", description: "asdf", title: "Leatherworking", __v: 0 }
  
          // column definitions and row data are immutable, the grid
          // will update when these lists change
          columnDefs={columnDefs}
          rowData={rowData}
  
          // or provide props the old way with no binding
          rowSelection="multiple"
          enableSorting="true"
          enableFilter="true"
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
          <div className="ag-fresh">
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