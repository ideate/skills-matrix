import {AgGridReact} from 'ag-grid-react'
import {browserHistory} from 'react-router'
import {capabilityCreate} from '../modules/async/capability-create'
import {connect} from 'react-redux'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import {skillsRead} from '../modules/async/skills-read'
import TextField from 'material-ui/TextField'
import {
  capabilityCreateChange,
  capabilityCreateReset
} from '../modules/capability-create'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

const style = {
  margin: 12
}

const skillSelect = {
  margin: '10 0 0 0'
}

class CapabilityCreate extends Component {
  
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
    capabilityCreateState: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    skillsState: PropTypes.object.isRequired
  }

  changeDescription = (event) => {
    const {dispatch} = this.props

    dispatch(capabilityCreateChange({description: event.target.value}))
  }

  changeTitle = (event) => {
    const {dispatch} = this.props

    dispatch(capabilityCreateChange({title: event.target.value}))
  }
  
<<<<<<< d24e7720a9ed67fe5835529cefef06d0b2cb157a
=======
  componentDidUpdate () {
    this.handleResize(this.refs.grid)
  }
  
  componentWillMount () {
    const {dispatch} = this.props

    dispatch(skillsRead())
  }

>>>>>>> Added ag-grid to capabilities for selection
  create = () => {
    const {dispatch, capabilityCreateState} = this.props
    const {
      description,
      title,
      skills
    } = capabilityCreateState

    dispatch(capabilityCreate({description, title, skills}))
  }
  
  getTableHeight () {
    const tableHeight = (this.props.skillsState.data.length * this.state.rowHeight) + this.state.headerHeight + 9

    const tableHeightStyle = {
      height: tableHeight
    }

    return tableHeightStyle
  }
  
  handleResize (grid) {
    grid.api.sizeColumnsToFit()
  }
  
  onGridReady (grid) {
    grid.api.sizeColumnsToFit()
  }
  
  onSelectionChanged () {
    const selectedRows = this.refs.grid.api.getSelectedRows()
    const selectedNodes = this.refs.grid.api.getSelectedNodes()
    const {dispatch} = this.props
    const skillId = []

    selectedRows.map(function (row) {
        skillId.push(row.id)
      })
    
    console.log(skillId)
    
    dispatch(capabilityCreateChange({skills: skillId}))

    //selectedNodes.map(function (node) {
    //  console.log(node.data)
    //  node.setSelected(true)
    //})
  }
  
  reset = () => {
    const {dispatch} = this.props

    dispatch(capabilityCreateReset())
  }

  render () {
    const {
      capabilityCreateState
    } = this.props

    const {
      description,
      title,
      skills
    } = capabilityCreateState
    
    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Create a Capability' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <IconButton
              onTouchTap={() => {
                this.reset()
                browserHistory.push('/capabilities')
              }}
            >
              <NavigationClose/>
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <main style={main}>
          <div>
            <TextField
              floatingLabelText='Title'
              fullWidth={true}
              value={title}
              onChange={this.changeTitle}
            />
          </div>
          <div>
            <TextField
              floatingLabelText='Description'
              fullWidth={true}
              value={description}
              onChange={this.changeDescription}
            />
          </div>
          <div>
            <RaisedButton
              label='Cancel'
              style={style}
              onTouchTap={() => {
                this.reset()
                browserHistory.push('/capabilities')
              }}
            />
            <RaisedButton
              label='Create'
              primary={true}
              style={style}
              onTouchTap={() => {
                this.create()
                this.reset()
                browserHistory.push('/capabilities')
              }}
            />
          </div>
        <Toolbar style={skillSelect}>
          <ToolbarGroup>
            <ToolbarTitle text='Select a capability&#39;s skills.  Select multiple by holding down Ctrl.' />
          </ToolbarGroup>
        </Toolbar>
          <div className='ag-material'
            style={this.getTableHeight()}>
           {this.renderSkills()}
           </div>
        </main>
      </div>
    )
  }
  
  renderSkills () {
    const {skillsState} = this.props

    if (skillsState && skillsState.data && skillsState.data.length) {
      const columnDefs = [
        {
          headerName: '',
          checkboxSelection: true,
          suppressSorting: true,
          width: 15
        },
        {headerName: 'Skill', field: 'title', cellStyle: {color: '#FF4081'}},
        {headerName: 'Description', field: 'description'}
      ]
      const rowData = []
      
      skillsState.data.map(function (skill) {
        rowData.push({id: skill._id, title: skill.title, description: skill.description})
      })
      
      // Setup the grid so that it properly checks/unchecks
      const gridProps = {
        onRowClicked: (event) => {
          const rowNode = event.node
          
          rowNode.setSelected(!rowNode.isSelected())
          console.log(rowNode.data)
        },
        rowSelection: 'multiple',
        suppressRowClickSelection: true
      }

      return (
        <AgGridReact
          {...gridProps}
          columnDefs={columnDefs}
          enableSorting='true'
          headerHeight={this.state.headerHeight}
          icons={this.state.icons}
          ref='grid'
          rowData={rowData}
          rowHeight={this.state.rowHeight}
          //rowSelection='multiple'
          suppressMovableColumns='true'
          onGridReady={this.onGridReady.bind(this)}
          onSelectionChanged={this.onSelectionChanged.bind(this)}
        />
      )
    }
  }
}

export default connect((state) => ({
  capabilityCreateState: state.capabilityCreate,
  skillsState: state.skills
}))(CapabilityCreate)