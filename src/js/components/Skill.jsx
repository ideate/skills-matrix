import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import {skillDelete} from '../modules/async/skill-delete'
import {skillRead} from '../modules/async/skill-read'
import {skillReset} from '../modules/skill'
import TextField from 'material-ui/TextField'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Skill extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    skillState: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch, params} = this.props

    dispatch(skillRead(params.id))
  }

  delete = () => {
    const {dispatch, params} = this.props

    dispatch(skillDelete(params.id))
  }

  reset = () => {
    const {dispatch} = this.props

    dispatch(skillReset())
  }

  render () {
    const {
      skillState
    } = this.props

    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Skill' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Edit'
              primary={true}
              onTouchTap={() => (browserHistory.push(`/skills/${this.props.params.id}/edit`))}
            />
            <RaisedButton
              label='Delete'
              primary={false}
              onTouchTap={() => {
                browserHistory.push('/skills')
                this.delete()
              }}
            />
          
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
              disabled={false}
              floatingLabelText='Title'
              fullWidth={true}
              value={skillState.title}
            />
          </div>
          <div>
            <TextField
              disabled={false}
              floatingLabelText='Description'
              fullWidth={true}
              value={skillState.description}
            />
          </div>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  skillState: state.skill
}))(Skill)