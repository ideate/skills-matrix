import {browserHistory} from 'react-router'
import {capabilityCreate} from '../modules/async/capability-create'
import {connect} from 'react-redux'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import Select from 'react-select'
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

class CapabilityCreate extends Component {
  
  constructor () {
    super()

    this.state = {
      selectSkillValues: []
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
  
  changeSkills = (selectSkillValues) => {
    const {dispatch} = this.props
    const skillIdArray = []
    
    this.setState({selectSkillValues})

    if (selectSkillValues) {
      selectSkillValues.map(function (selectedSkill) {
        skillIdArray.push(selectedSkill.value)
      })
    }

    dispatch(capabilityCreateChange({skills: skillIdArray}))
  }

  changeTitle = (event) => {
    const {dispatch} = this.props

    dispatch(capabilityCreateChange({title: event.target.value}))
  }
  
  componentWillMount () {
    const {dispatch} = this.props

    dispatch(skillsRead())
  }

  create = () => {
    const {dispatch, capabilityCreateState} = this.props
    const {
      description,
      title,
      skills
    } = capabilityCreateState

    dispatch(capabilityCreate({description, title, skills}))
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
      title
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
          <br />
          <div>
            {this.renderSkills()}
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

  renderSkills () {
    const {skillsState} = this.props
    const selectSkillOptions = []
    
    if (skillsState && skillsState.data && skillsState.data.length) {
      skillsState.data.map(function (skill) {
        selectSkillOptions.push({value: skill._id, label: skill.title})
      })
    }
    
    return (
      <Select
        multi={true}
        options={selectSkillOptions}
        placeholder='Select skills...'
        value={this.state.selectSkillValues}
        onChange={this.changeSkills}
      />
    )
  }
}

export default connect((state) => ({
  capabilityCreateState: state.capabilityCreate,
  skillsState: state.skills
}))(CapabilityCreate)