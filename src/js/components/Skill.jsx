import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog'
import {employeesRead} from '../modules/async/employees-read'
import FlatButton from 'material-ui/FlatButton'
import {main} from '../styles/common'
import RaisedButton from 'material-ui/RaisedButton'
import Select from 'react-select'
import {skillDelete} from '../modules/async/skill-delete'
import {skillRead} from '../modules/async/skill-read'
import {skillReset} from '../modules/skill'
import TextField from 'material-ui/TextField'
import {
  displayEmployees,
  displayskill,
  displaySkills,
  displayskills
} from '../../../config'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

const style = {
  buttonLabel: {
    fontSize: '20px',
    padding: '0px',
    textTransform: 'none'
  },
  button: {
    margin: '10px 10px 0px 0px',
    minWidth: '0px',
    textAlign: 'left'
  },
  opacity: {
    opacity: '0.4'
  }
}

class Skill extends Component {
  
  state = {
    open: false
  }
  
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    employeesState: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    skillState: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch, params} = this.props

    dispatch(employeesRead())
    dispatch(skillRead(params.id))
  }

  delete = () => {
    const {dispatch, params} = this.props

    dispatch(skillDelete(params.id))
  }
  
  handleOpen = () => {
    this.setState({open: true})
  }
  
  handleClose = () => {
    this.setState({open: false})
  }
  
  handleDelete = () => {
    this.setState({open: false})
    this.delete()
    browserHistory.push(`/${displayskills}`)
  }

  reset = () => {
    const {dispatch} = this.props

    dispatch(skillReset())
  }

  render () {
    const {
      employeesState,
      skillState
    } = this.props
    
    const actions = [
      <FlatButton
        key='cancel'
        label='Cancel'
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        key='delete'
        label='Delete'
        primary={true}
        onTouchTap={this.handleDelete}
      />
    ]
    
    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <FlatButton
              label={`${displaySkills} /`}
              labelStyle={style.buttonLabel}
              style={style.button}
              onTouchTap={() => {
                browserHistory.push(`/${displayskills}`)
              }}
            />
            <ToolbarTitle
              text={`${skillState.title}`}
            />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Edit'
              primary={true}
              onTouchTap={() => (browserHistory.push(`/${displayskills}/${this.props.params.id}/edit`))}
            />
            <RaisedButton
              label='Delete'
              primary={false}
              onTouchTap={this.handleOpen}
            />
            <Dialog
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              Are you sure you want to delete this {displayskill}?
            </Dialog>
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
          <br />
          {this.renderEmployees(employeesState.data, skillState._id)}
        </main>
      </div>
    )
  }
  
  renderEmployees (employees, skill) {
    const employeesWithSkill = []
    
    for (let i = 0; i < employees.length; i++) {
      for (let j = 0; j < employees[i].skills.length; j++) {
        if (employees[i].skills[j] === skill) {
          employeesWithSkill.push({value: skill, label: employees[i].title})
          break
        }
      }
    }
    
    return (
      <div>
        <br />
        <small style={style.opacity}>{`${displayEmployees} with this ${displayskill}`}</small>
        <Select
          disable={true}
          multi={true}
          placeholder={`No ${displayEmployees}`}
          searchable={false}
          value={employeesWithSkill}
        />
      </div>
    )
  }
}

export default connect((state) => ({
  employeesState: state.employees,
  skillState: state.skill
}))(Skill)