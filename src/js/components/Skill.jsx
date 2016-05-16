import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
// import {skillsDelete} from '../modules/async/skills-delete'
import TextField from 'material-ui/TextField'
import {header, main} from '../styles/common'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

const style = {
  margin: 12,
}

class Skill extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    skill: PropTypes.object.isRequired
  }

  render () {
    const {
      skill
    } = this.props

    const {
      description,
      title
    } = skill
    
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
              onTouchTap={() => (browserHistory.push('/skills'))}
            />
            <RaisedButton
              label='Delete'
              primary={false}
              onTouchTap={() => (browserHistory.push('/skills'))}
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
              disabled={true}
              floatingLabelText='Title'
              fullWidth={true}
              value={title}
            />
          </div>
          <div>
            <TextField
              disabled={true}
              floatingLabelText='Description'
              fullWidth={true}
              value={description}
            />
          </div>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  skill: state.skill
}))(Skill)