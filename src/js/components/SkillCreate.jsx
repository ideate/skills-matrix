import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import {skillCreate} from '../modules/async/skill-create'
import TextField from 'material-ui/TextField'
import {
  displaySkill,
  displayskills
} from '../../../config'
import React, {Component, PropTypes} from 'react'
import {
  skillCreateChange,
  skillCreateReset
} from '../modules/skill-create'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

const style = {
  margin: 12
}

class SkillCreate extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    skillCreateState: PropTypes.object.isRequired
  }

  changeDescription = (event) => {
    const {dispatch} = this.props

    dispatch(skillCreateChange({description: event.target.value}))
  }

  changeTitle = (event) => {
    const {dispatch} = this.props

    dispatch(skillCreateChange({title: event.target.value}))
  }

  create = () => {
    const {dispatch, skillCreateState} = this.props
    const {
      description,
      title
    } = skillCreateState

    dispatch(skillCreate({description, title}))
  }

  reset = () => {
    const {dispatch} = this.props

    dispatch(skillCreateReset())
  }

  render () {
    const {
      skillCreateState
    } = this.props

    const {
      description,
      title
    } = skillCreateState
    
    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text={`Create ${displaySkill}`} />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <IconButton
              onTouchTap={() => {
                this.reset()
                browserHistory.push(`/${displayskills}`)
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
                browserHistory.push(`/${displayskills}`)
              }}
            />
            <RaisedButton
              label='Create'
              primary={true}
              style={style}
              onTouchTap={() => {
                this.create()
                this.reset()
                browserHistory.push(`/${displayskills}`)
              }}
            />
          </div>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  skillCreateState: state.skillCreate
}))(SkillCreate)