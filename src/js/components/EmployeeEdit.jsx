import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {employeeRead} from '../modules/async/employee-read'
import {employeeUpdate} from '../modules/async/employee-update'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {
  employeeEditChange,
  employeeEditReset
} from '../modules/employee-edit'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

const style = {
  margin: 12
}

class EmployeeEdit extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    employeeEditState: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch, params} = this.props

    dispatch(employeeRead(params.id))
  }

  changeDescription = (event) => {
    const {dispatch} = this.props

    dispatch(employeeEditChange({description: event.target.value}))
  }

  changeTitle = (event) => {
    const {dispatch} = this.props

    dispatch(employeeEditChange({title: event.target.value}))
  }

  reset = () => {
    const {dispatch} = this.props

    dispatch(employeeEditReset())
  }

  update = () => {
    const {dispatch, employeeEditState} = this.props

    dispatch(employeeUpdate(employeeEditState))
  }

  render () {
    const {
      employeeEditState
    } = this.props

    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Edit an Employee' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <IconButton
              onTouchTap={() => {
                this.reset()
                browserHistory.push(`/employees/${this.props.params.id}`)
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
              value={employeeEditState.title}
              onChange={this.changeTitle}
            />
          </div>
          <div>
            <TextField
              floatingLabelText='Description'
              fullWidth={true}
              value={employeeEditState.description}
              onChange={this.changeDescription}
            />
          </div>
          <div>
            <RaisedButton
              label='Cancel'
              style={style}
              onTouchTap={() => {
                this.reset()
                browserHistory.push(`/employees/${this.props.params.id}`)
              }}
            />
            <RaisedButton
              label='Update'
              primary={true}
              style={style}
              onTouchTap={() => {
                this.update()
                this.reset()
                browserHistory.push(`/employees/${this.props.params.id}`)
              }}
            />
          </div>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  employeeEditState: state.employeeEdit
}))(EmployeeEdit)