import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import {strategyDelete} from '../modules/async/strategy-delete'
import {strategyRead} from '../modules/async/strategy-read'
import TextField from 'material-ui/TextField'
import React, {Component, PropTypes} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Strategy extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    strategyState: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch, params} = this.props

    dispatch(strategyRead(params.id))
  }

  delete = () => {
    const {dispatch, params} = this.props

    dispatch(strategyDelete(params.id))
  }

  render () {
    const {
      strategyState
    } = this.props

    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Strategy' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Edit'
              primary={true}
              onTouchTap={() => (browserHistory.push(`/strategies/${this.props.params.id}/edit`))}
            />
            <RaisedButton
              label='Delete'
              primary={false}
              onTouchTap={() => {
                browserHistory.push('/strategies')
                this.delete()
              }}
            />
          
            <IconButton
              onTouchTap={() => {
                browserHistory.push('/strategies')
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
              value={strategyState.title}
            />
          </div>
          <div>
            <TextField
              disabled={false}
              floatingLabelText='Description'
              fullWidth={true}
              value={strategyState.description}
            />
          </div>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  strategyState: state.strategy
}))(Strategy)