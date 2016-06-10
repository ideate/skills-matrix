import {browserHistory} from 'react-router'
import {capabilityRead} from '../modules/async/capability-read'
import {capabilityUpdate} from '../modules/async/capability-update'
import {connect} from 'react-redux'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import Select from 'react-select'
import {skillsRead} from '../modules/async/skills-read'
import TextField from 'material-ui/TextField'
import {
  capabilityEditChange,
  capabilityEditReset
} from '../modules/capability-edit'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

const style = {
  margin: 12
}

class CapabilityEdit extends Component {
  
  constructor () {
    super()

    this.state = {
      selectSkillValues: []
    }
  }
  
  static propTypes = {
    capabilityEditState: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    skillsState: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch, params} = this.props

    dispatch(capabilityRead(params.id))
    dispatch(skillsRead())
  }

  changeDescription = (event) => {
    const {dispatch} = this.props

    dispatch(capabilityEditChange({description: event.target.value}))
  }
  
  changeSkills = (selectSkillValues) => {
    const {dispatch} = this.props
    const skillIdArray = []

    this.setState({selectSkillValues})

    selectSkillValues.map(function (selectedSkill) {
      skillIdArray.push(selectedSkill.value)
    })

    dispatch(capabilityEditChange({skills: skillIdArray}))
  }

  changeTitle = (event) => {
    const {dispatch} = this.props

    dispatch(capabilityEditChange({title: event.target.value}))
  }

  reset = () => {
    const {dispatch} = this.props

    dispatch(capabilityEditReset())
  }
  
  update = () => {
    const {dispatch, capabilityEditState} = this.props

    dispatch(capabilityUpdate(capabilityEditState))
  }

  render () {
    const {
      capabilityEditState
    } = this.props

    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Edit a Capability' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <IconButton
              onTouchTap={() => {
                this.reset()
                browserHistory.push(`/capabilities/${this.props.params.id}`)
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
              value={capabilityEditState.title}
              onChange={this.changeTitle}
            />
          </div>
          <div>
            <TextField
              floatingLabelText='Description'
              fullWidth={true}
              value={capabilityEditState.description}
              onChange={this.changeDescription}
            />
          </div>
          <br />
          <div>
            {this.renderSkills(capabilityEditState.skills)}
          </div>
          <div>
            <RaisedButton
              label='Cancel'
              style={style}
              onTouchTap={() => {
                this.reset()
                browserHistory.push(`/capabilities/${this.props.params.id}`)
              }}
            />
            <RaisedButton
              label='Update'
              primary={true}
              style={style}
              onTouchTap={() => {
                this.update()
                this.reset()
                browserHistory.push(`/capabilities/${this.props.params.id}`)
              }}
            />
          </div>
        </main>
      </div>
    )
  }
  
  renderSkills (skills) {
    const {skillsState} = this.props
    const selectSkillValues = this.state.selectSkillValues
    const selectSkillOptions = []

    if (skills && skills.length && !selectSkillValues.length) {
      skills.map(function (skill) {
        selectSkillValues.push({_id: skill._id, title: skill.title, description: skill.description, value: skill._id, label: skill.title})
      })
    }

    if (skillsState && skillsState.data && skillsState.data.length) {
      skillsState.data.map(function (skill) {
        selectSkillOptions.push({_id: skill._id, title: skill.title, description: skill.description, value: skill._id, label: skill.title})
      })
    }
  
    return (
      <Select
        multi={true}
        options={selectSkillOptions}
        placeholder='No skills'
        value={selectSkillValues}
        onChange={this.changeSkills}
      />
    )
  }
}

export default connect((state) => ({
  capabilityEditState: state.capabilityEdit,
  skillsState: state.skills
}))(CapabilityEdit)