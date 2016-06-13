import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {employeeCreate} from '../modules/async/employee-create'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import Select from 'react-select'
import {skillsRead} from '../modules/async/skills-read'
import TextField from 'material-ui/TextField'
import {
  displayEmployee,
  displayemployees,
  displayskills
} from '../../../config'
import {
  employeeCreateChange,
  employeeCreateReset
} from '../modules/employee-create'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

const style = {
  margin: 12
}

class EmployeeCreate extends Component {
  
  constructor () {
    super()

    this.state = {
      selectSkillValues: []
    }
  }
  
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    employeeCreateState: PropTypes.object.isRequired,
    skillsState: PropTypes.object.isRequired
  }

  changeDescription = (event) => {
    const {dispatch} = this.props

    dispatch(employeeCreateChange({description: event.target.value}))
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

    dispatch(employeeCreateChange({skills: skillIdArray}))
  }

  changeTitle = (event) => {
    const {dispatch} = this.props

    dispatch(employeeCreateChange({title: event.target.value}))
  }
  
  componentWillMount () {
    const {dispatch} = this.props

    dispatch(skillsRead())
  }

  create = () => {
    const {dispatch, employeeCreateState} = this.props
    const {
      description,
      title,
      skills
    } = employeeCreateState

    dispatch(employeeCreate({description, title, skills}))
  }

  reset = () => {
    const {dispatch} = this.props

    dispatch(employeeCreateReset())
  }

  render () {
    const {
      employeeCreateState
    } = this.props

    const {
      description,
      title
    } = employeeCreateState
    
    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text={`Create ${displayEmployee}`} />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <IconButton
              onTouchTap={() => {
                this.reset()
                browserHistory.push(`/${displayemployees}`)
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
                browserHistory.push(`/${displayemployees}`)
              }}
            />
            <RaisedButton
              label='Create'
              primary={true}
              style={style}
              onTouchTap={() => {
                this.create()
                this.reset()
                browserHistory.push(`/${displayemployees}`)
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
        placeholder={`Select ${displayskills}`}
        value={this.state.selectSkillValues}
        onChange={this.changeSkills}
      />
    )
  }
}

export default connect((state) => ({
  employeeCreateState: state.employeeCreate,
  skillsState: state.skills
}))(EmployeeCreate)