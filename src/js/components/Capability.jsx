import {browserHistory} from 'react-router'
import {capabilityDelete} from '../modules/async/capability-delete'
import {capabilityRead} from '../modules/async/capability-read'
import {capabilityReset} from '../modules/capability'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import Select from 'react-select'
import TextField from 'material-ui/TextField'
import {
  displaycapabilities,
  displayCapability,
  displaycapability,
  displayskills
} from '../../../config'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Capability extends Component {
  
  state = {
    open: false
  }

  static propTypes = {
    capabilityState: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch, params} = this.props

    dispatch(capabilityRead(params.id))
  }

  delete = () => {
    const {dispatch, params} = this.props

    dispatch(capabilityDelete(params.id))
  }
  
  handleOpen = () => {
    this.setState({open: true})
  }
  
  handleClose = () => {
    this.setState({open: false})
  }
  
  handleDelete = () => {
    this.setState({open: false})
    this.delete()
    browserHistory.push(`/${displaycapabilities}`)
  }

  reset = () => {
    const {dispatch} = this.props

    dispatch(capabilityReset())
  }

  render () {
    const {
      capabilityState
    } = this.props
    
    const actions = [
      <FlatButton
        key='cancel'
        label='Cancel'
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        key='delete'
        label='Delete'
        primary={true}
        onTouchTap={this.handleDelete}
      />
    ]
    
    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text={displayCapability}/>
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Edit'
              primary={true}
              onTouchTap={() => (browserHistory.push(`/${displaycapabilities}/${this.props.params.id}/edit`))}
            />
            <RaisedButton
              label='Delete'
              primary={false}
              onTouchTap={this.handleOpen}
            />
            <Dialog
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              Are you sure you want to delete this {displaycapability}?
            </Dialog>
            <IconButton
              onTouchTap={() => {
                this.reset()
                browserHistory.push(`/${displaycapabilities}`)
              }}
            >
              <NavigationClose/>
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <main style={main}>
          <div>
            <TextField
              disabled={false}
              floatingLabelText='Title'
              fullWidth={true}
              value={capabilityState.title}
            />
          </div>
          <div>
            <TextField
              disabled={false}
              floatingLabelText='Description'
              fullWidth={true}
              value={capabilityState.description}
            />
          </div>
          <br />
          <div>
            {this.renderSkills(capabilityState.skills)}
          </div>
        </main>
      </div>
    )
  }
  
  renderSkills (skills) {
    const selectSkillValues = []

    if (skills && skills.length) {
      skills.map(function (skill) {
        selectSkillValues.push({value: skill._id, label: skill.title})
      })
    }
  
    return (
      <Select
        disable={true}
        multi={true}
        placeholder={`No ${displayskills}`}
        searchable={false}
        value={selectSkillValues}
      />
    )
  }
  
}

export default connect((state) => ({
  capabilityState: state.capability
}))(Capability)