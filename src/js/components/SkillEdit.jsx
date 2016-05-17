import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import {skillRead} from '../modules/async/skill-read'
import {skillUpdate} from '../modules/async/skill-update'
import TextField from 'material-ui/TextField'
import {header, main} from '../styles/common'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

const style = {
  margin: 12,
}

class SkillEdit extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    skillEdit: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch, params} = this.props

    dispatch(skillRead(params.id))
  }

  reset = () => {
    const {dispatch} = this.props

    dispatch(skillsEditReset())
  }

  update = () => {
    const {dispatch, skillEdit} = this.props
    const {
      description,
      title
    } = skillEdit

    dispatch(skillUpdate({description, title}))
  }

  render () {
    const {
      skillEdit
    } = this.props

    const {
      description,
      title
    } = skillEdit
    
    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Edit a Skill' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <IconButton
              onTouchTap={() => {
                browserHistory.push(`/skills/${this.props.params.id}`)
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
              fullWidth={true}
              value={skillEdit.data.title}
            />
          </div>
          <div>
            <TextField
              floatingLabelText='Description'
              fullWidth={true}
              value={skillEdit.data.description}
            />
          </div>
          <div>
            <RaisedButton
              label="Cancel"
              style={style}
              onTouchTap={() => {
                browserHistory.push(`/skills/${this.props.params.id}`)
                this.reset()
              }}
            />
            <RaisedButton
              label="Update"
              primary={true}
              style={style}
              onTouchTap={() => {
                browserHistory.push(`/skills/${this.props.params.id}`)
                this.update()
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
  skillEdit: state.skillEdit
}))(SkillEdit)