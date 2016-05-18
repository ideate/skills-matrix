import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import {organizationDelete} from '../modules/async/organization-delete'
import {organizationRead} from '../modules/async/organization-read'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Organization extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    organizationState: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch, params} = this.props

    dispatch(organizationRead(params.id))
  }

  delete = () => {
    const {dispatch, params} = this.props

    dispatch(organizationDelete(params.id))
  }

  render () {
    const {
      organizationState
    } = this.props

    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Organization' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Edit'
              primary={true}
              onTouchTap={() => (browserHistory.push(`/organizations/${this.props.params.id}/edit`))}
            />
            <RaisedButton
              label='Delete'
              primary={false}
              onTouchTap={() => {
                browserHistory.push('/organizations')
                this.delete()
              }}
            />
          
            <IconButton
              onTouchTap={() => {
                browserHistory.push('/organizations')
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
              value={organizationState.title}
            />
          </div>
          <div>
            <TextField
              disabled={false}
              floatingLabelText='Description'
              fullWidth={true}
              value={organizationState.description}
            />
          </div>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  organizationState: state.organization
}))(Organization)