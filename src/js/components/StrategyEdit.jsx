import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import Select from 'react-select'
import {skillsRead} from '../modules/async/skills-read'
import {strategyRead} from '../modules/async/strategy-read'
import {strategyUpdate} from '../modules/async/strategy-update'
import TextField from 'material-ui/TextField'
import React, {Component, PropTypes} from 'react'
import {
  strategyEditChange,
  strategyEditReset
} from '../modules/strategy-edit'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

const style = {
  margin: 12
}

class StrategyEdit extends Component {
  
  constructor () {
    super()

    this.state = {
      selectSkillValues: []
    }
  }
  
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    skillsState: PropTypes.object.isRequired,
    strategyEditState: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch, params} = this.props

    dispatch(skillsRead())
    dispatch(strategyRead(params.id))
  }

  changeDescription = (event) => {
    const {dispatch} = this.props

    dispatch(strategyEditChange({description: event.target.value}))
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

    dispatch(strategyEditChange({skills: skillIdArray}))
  }

  changeTitle = (event) => {
    const {dispatch} = this.props

    dispatch(strategyEditChange({title: event.target.value}))
  }

  reset = () => {
    const {dispatch} = this.props

    dispatch(strategyEditReset())
  }

  update = () => {
    const {dispatch, strategyEditState} = this.props

    dispatch(strategyUpdate(strategyEditState))
  }

  render () {
    const {
      strategyEditState
    } = this.props

    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Edit a Strategy' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <IconButton
              onTouchTap={() => {
                this.reset()
                browserHistory.push(`/strategies/${this.props.params.id}`)
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
              value={strategyEditState.title}
              onChange={this.changeTitle}
            />
          </div>
          <div>
            <TextField
              floatingLabelText='Description'
              fullWidth={true}
              value={strategyEditState.description}
              onChange={this.changeDescription}
            />
          </div>
          <br />
          <div>
            {this.renderSkills(strategyEditState.skills)}
          </div>
          <div>
            <RaisedButton
              label='Cancel'
              style={style}
              onTouchTap={() => {
                this.reset()
                browserHistory.push(`/strategies/${this.props.params.id}`)
              }}
            />
            <RaisedButton
              label='Update'
              primary={true}
              style={style}
              onTouchTap={() => {
                this.update()
                this.reset()
                browserHistory.push(`/strategies/${this.props.params.id}`)
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
  strategyEditState: state.strategyEdit,
  skillsState: state.skills
}))(StrategyEdit)