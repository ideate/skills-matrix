import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {employeeRead} from '../modules/async/employee-read'
import {employeeUpdate} from '../modules/async/employee-update'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import Select from 'react-select'
import {skillsRead} from '../modules/async/skills-read'
import TextField from 'material-ui/TextField'
import VisibilitySelectField from './VisibilitySelectField'
import {visibilitySelectFieldChange} from '../modules/visibility-select-field'
import {
  displayEmployee,
  displayemployees,
  displayskills
} from '../../../config'
import {
  employeeEditChange,
  employeeEditReset
} from '../modules/employee-edit'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

const style = {
  margin: 12
}

class EmployeeEdit extends Component {
  
  constructor () {
    super()

    this.state = {
      selectSkillValues: []
    }
  }
  
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    employeeEditState: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    skillsState: PropTypes.object.isRequired,
    visibilitySelectFieldState: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch, params} = this.props

    dispatch(employeeRead(params.id))
    dispatch(skillsRead())
    dispatch(visibilitySelectFieldChange({disabled: false}))
  }

  changeDescription = (event) => {
    const {dispatch} = this.props

    dispatch(employeeEditChange({description: event.target.value}))
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

    dispatch(employeeEditChange({skills: skillIdArray}))
  }

  changeTitle = (event) => {
    const {dispatch} = this.props

    dispatch(employeeEditChange({title: event.target.value}))
  }

  reset = () => {
    const {dispatch} = this.props

    dispatch(employeeEditReset())
  }

  update = () => {
    const {dispatch, employeeEditState, visibilitySelectFieldState} = this.props
    
    const {
      visibility
    } = visibilitySelectFieldState

    dispatch(employeeUpdate({...employeeEditState, visibility}))
  }

  render () {
    const {
      employeeEditState
    } = this.props

    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text={`Edit ${displayEmployee}`} />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <IconButton
              onTouchTap={() => {
                this.reset()
                browserHistory.push(`/${displayemployees}/${this.props.params.id}`)
              }}
            >
              <NavigationClose/>
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <main style={main}>
          <VisibilitySelectField />
          <div>
            <TextField
              floatingLabelText='Title'
              fullWidth={true}
              value={employeeEditState.title}
              onChange={this.changeTitle}
            />
          </div>
          <div>
            <TextField
              floatingLabelText='Description'
              fullWidth={true}
              value={employeeEditState.description}
              onChange={this.changeDescription}
            />
          </div>
          <br />
          <div>
            {this.renderSkills(employeeEditState.skills)}
          </div>
          <div>
            <RaisedButton
              label='Cancel'
              style={style}
              onTouchTap={() => {
                this.reset()
                browserHistory.push(`/${displayemployees}/${this.props.params.id}`)
              }}
            />
            <RaisedButton
              label='Update'
              primary={true}
              style={style}
              onTouchTap={() => {
                this.update()
                this.reset()
                browserHistory.push(`/${displayemployees}/${this.props.params.id}`)
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
        placeholder={`No ${displayskills}`}
        value={selectSkillValues}
        onChange={this.changeSkills}
      />
    )
  }
}

export default connect((state) => ({
  employeeEditState: state.employeeEdit,
  skillsState: state.skills,
  visibilitySelectFieldState: state.visibilitySelectField
}))(EmployeeEdit)