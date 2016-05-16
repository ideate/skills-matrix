import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import {main} from '../styles/common'
import RaisedButton from 'material-ui/RaisedButton'
import {skillsRead} from '../modules/async/skills-read'
import React, {Component, PropTypes} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
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

  renderSkills () {
    const {skills} = this.props

    if(skills && skills.data && skills.data.length){
      return(
        skills.data.map(function(skill) {
          return (
            <TableRow key={skill._id}>
              <TableRowColumn>
                <FlatButton
                  label={skill.title}
                  secondary={true}
                  onTouchTap={() => {
                    browserHistory.push(`/skills/${skill._id}`)
                  }}
                />
              </TableRowColumn>
              <TableRowColumn>{skill.description}</TableRowColumn>
            </TableRow>
          )
        })
      )
    }
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
          <Table
            multiSelectable={false}
            selectable={false}
          >
            <TableHeader
              adjustForCheckbox={false}
              displaySelectAll={false}
              enableSelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn>Skill</TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              {this.renderSkills()}
            </TableBody>
          </Table>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  skills: state.skills
}))(Skills)