import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {employeeCreate} from '../modules/async/employee-create'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import {
  employeeCreateChange,
  employeeCreateReset
} from '../modules/employee-create'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

const style = {
  margin: 12
}

class EmployeeCreate extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    employeeCreateState: PropTypes.object.isRequired
  }

  changeDescription = (event) => {
    const {dispatch} = this.props

    dispatch(employeeCreateChange({description: event.target.value}))
  }

  changeTitle = (event) => {
    const {dispatch} = this.props

    dispatch(employeeCreateChange({title: event.target.value}))
  }

  create = () => {
    const {dispatch, employeeCreateState} = this.props
    const {
      description,
      title
    } = employeeCreateState

    dispatch(employeeCreate({description, title}))
  }

  reset = () => {
    const {dispatch} = this.props

    dispatch(employeeCreateReset())
  }

  render () {
    const {
      employeeCreateState
    } = this.props

    const {
      description,
      title
    } = employeeCreateState
    
    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Create an Employee' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <IconButton
              onTouchTap={() => {
                this.reset()
                browserHistory.push('/employees')
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
                browserHistory.push('/employees')
              }}
            />
            <RaisedButton
              label='Create'
              primary={true}
              style={style}
              onTouchTap={() => {
                this.create()
                this.reset()
                browserHistory.push('/employees')
              }}
            />
          </div>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  employeeCreateState: state.employeeCreate
}))(EmployeeCreate)