import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import Select from 'react-select'
import {skillsRead} from '../modules/async/skills-read'
import {strategyCreate} from '../modules/async/strategy-create'
import TextField from 'material-ui/TextField'
import {
  displayskills,
  displaystrategies,
  displayStrategy
} from '../../../config'
import React, {Component, PropTypes} from 'react'
import {
  strategyCreateChange,
  strategyCreateReset
} from '../modules/strategy-create'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

const style = {
  margin: 12
}

class StrategyCreate extends Component {
  
  constructor () {
    super()

    this.state = {
      selectSkillValues: []
    }
  }
  
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    skillsState: PropTypes.object.isRequired,
    strategyCreateState: PropTypes.object.isRequired
  }

  changeDescription = (event) => {
    const {dispatch} = this.props

    dispatch(strategyCreateChange({description: event.target.value}))
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

    dispatch(strategyCreateChange({skills: skillIdArray}))
  }

  changeTitle = (event) => {
    const {dispatch} = this.props

    dispatch(strategyCreateChange({title: event.target.value}))
  }
  
  componentWillMount () {
    const {dispatch} = this.props

    dispatch(skillsRead())
  }

  create = () => {
    const {dispatch, strategyCreateState} = this.props
    const {
      description,
      title,
      skills
    } = strategyCreateState

    dispatch(strategyCreate({description, title, skills}))
  }

  reset = () => {
    const {dispatch} = this.props

    dispatch(strategyCreateReset())
  }

  render () {
    const {
      strategyCreateState
    } = this.props

    const {
      description,
      title
    } = strategyCreateState
    
    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text={`Create ${displayStrategy}`} />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <IconButton
              onTouchTap={() => {
                this.reset()
                browserHistory.push(`/${displaystrategies}`)
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
                browserHistory.push(`/${displaystrategies}`)
              }}
            />
            <RaisedButton
              label='Create'
              primary={true}
              style={style}
              onTouchTap={() => {
                this.create()
                this.reset()
                browserHistory.push(`/${displaystrategies}`)
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
  strategyCreateState: state.strategyCreate,
  skillsState: state.skills
}))(StrategyCreate)