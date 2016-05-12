import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {main} from '../styles/common'
import RaisedButton from 'material-ui/RaisedButton'
import {skillsRead} from '../modules/async/skills-read'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Skills extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    skills: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch} = this.props

    dispatch(skillsRead())
  }

  render () {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Skills' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Create'
              primary={true}
              onTouchTap={() => (browserHistory.push('/skills/create'))}
            />
          </ToolbarGroup>
        </Toolbar>
        <main style={main}>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  skills: state.skills
}))(Skills)