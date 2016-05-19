import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import {employeeDelete} from '../modules/async/employee-delete'
import {employeeRead} from '../modules/async/employee-read'
import {employeeReset} from '../modules/employee'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Employee extends Component {
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

  reset = () => {
    const {dispatch} = this.props

    dispatch(employeeReset())
  }

  render () {
    const {
      employeeState
    } = this.props

    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Employee' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Edit'
              primary={true}
              onTouchTap={() => (browserHistory.push(`/employees/${this.props.params.id}/edit`))}
            />
            <RaisedButton
              label='Delete'
              primary={false}
              onTouchTap={() => {
                this.delete()
                browserHistory.push('/employees')
              }}
            />
          
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
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  employeeState: state.employee
}))(Employee)