import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog'
import {employeeDelete} from '../modules/async/employee-delete'
import {employeeRead} from '../modules/async/employee-read'
import {employeeReset} from '../modules/employee'
import FlatButton from 'material-ui/FlatButton'
import {main} from '../styles/common'
import RaisedButton from 'material-ui/RaisedButton'
import Select from 'react-select'
import TextField from 'material-ui/TextField'
import VisibilitySelectField from './VisibilitySelectField'
import {
  displayemployee,
  displayEmployees,
  displayemployees,
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
  }
}

class Employee extends Component {
  
  state = {
    open: false
  }
  
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    employeeState: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch, params} = this.props

    dispatch(employeeRead(params.id))
  }

  delete = () => {
    const {dispatch, params} = this.props

    dispatch(employeeDelete(params.id))
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
    browserHistory.push(`/${displayemployees}`)
  }

  reset = () => {
    const {dispatch} = this.props

    dispatch(employeeReset())
  }

  render () {
    const {
      employeeState
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
              label={`${displayEmployees} /`}
              labelStyle={style.buttonLabel}
              style={style.button}
              onTouchTap={() => {
                browserHistory.push(`/${displayemployees}`)
              }}
            />
            <ToolbarTitle
              text={`${employeeState.title}`}
            />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Edit'
              primary={true}
              onTouchTap={() => (browserHistory.push(`/${displayemployees}/${this.props.params.id}/edit`))}
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
              Are you sure you want to delete this {displayemployee}?
            </Dialog>
          </ToolbarGroup>
        </Toolbar>
        <main style={main}>
          <VisibilitySelectField />
          <div>
            <TextField
              disabled={false}
              floatingLabelText='Title'
              fullWidth={true}
              value={employeeState.title}
            />
          </div>
          <div>
            <TextField
              disabled={false}
              floatingLabelText='Description'
              fullWidth={true}
              value={employeeState.description}
            />
          </div>
          <br />
          <div>
            {this.renderSkills(employeeState.skills)}
          </div>
        </main>
      </div>
    )
  }
  
  renderSkills (skills) {
    const selectSkillValues = []

    if (skills && skills.length) {
      skills.map(function (skill) {
        selectSkillValues.push({value: skill._id, label: skill.title})
      })
    }
  
    return (
      <Select
        disable={true}
        multi={true}
        placeholder={`No ${displayskills}`}
        searchable={false}
        value={selectSkillValues}
      />
    )
  }
  
}

export default connect((state) => ({
  employeeState: state.employee
}))(Employee)