import {AgGridReact} from 'ag-grid-react'
import {browserHistory} from 'react-router'
import {capabilityCreate} from '../modules/async/capability-create'
import {connect} from 'react-redux'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
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
    dispatch: PropTypes.func.isRequired
  }

  changeDescription = (event) => {
    const {dispatch} = this.props

    dispatch(capabilityCreateChange({description: event.target.value}))
  }

  changeTitle = (event) => {
    const {dispatch} = this.props

    dispatch(capabilityCreateChange({title: event.target.value}))
  }
  
<<<<<<< d78a9706a3fb054a9c9db41ba4ca16c9fddf5622
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
=======
>>>>>>> Fixing rebasing issues
  create = () => {
    const {dispatch, capabilityCreateState} = this.props
    const {
      description,
      title,
    } = capabilityCreateState

    dispatch(capabilityCreate({description, title}))
  }
  
<<<<<<< d78a9706a3fb054a9c9db41ba4ca16c9fddf5622
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
  
=======
>>>>>>> Fixing rebasing issues
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
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  capabilityCreateState: state.capabilityCreate
}))(CapabilityCreate)