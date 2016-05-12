import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import {skillsCreate} from '../modules/async/skills-create'
import TextField from 'material-ui/TextField'
import {header, main} from '../styles/common'
import React, {Component, PropTypes} from 'react'
import {
  skillsCreateFormChange,
  skillsCreateFormReset
} from '../modules/skills-create-form'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

const style = {
  margin: 12,
}

class SkillsCreate extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    skillsCreateForm: PropTypes.object.isRequired
  }

  changeDescription = (event) => {
    const {dispatch} = this.props

    dispatch(skillsCreateFormChange({description: event.target.value}))
  }

  changeTitle = (event) => {
    const {dispatch} = this.props

    dispatch(skillsCreateFormChange({title: event.target.value}))
  }

  create = () => {
    const {dispatch, skillsCreateForm} = this.props
    const {
      description,
      title
    } = skillsCreateForm

    dispatch(skillsCreate({description, title}))
  }

  reset = () => {
    const {dispatch} = this.props

    dispatch(skillsCreateFormReset())
  }

  render () {
    const {
      skillsCreateForm
    } = this.props

    const {
      description,
      title
    } = skillsCreateForm
    
    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Create a Skill' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <IconButton
              onTouchTap={() => {
                browserHistory.push('/skills')
                this.reset()
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
              value={title}
              onChange={this.changeTitle}
            />
          </div>
          <div>
            <TextField
              floatingLabelText='Description'
              value={description}
              onChange={this.changeDescription}
            />
          </div>
          <div>
            <RaisedButton
              label="Cancel"
              style={style}
              onTouchTap={() => {
                browserHistory.push('/skills')
                this.reset()
              }}
            />
            <RaisedButton
              label="Create"
              primary={true}
              style={style}
              onTouchTap={() => {
                browserHistory.push('/skills')
                this.create()
                this.reset()
              }}
            />
          </div>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  skillsCreateForm: state.skillsCreateForm
}))(SkillsCreate)