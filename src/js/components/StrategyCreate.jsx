import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import IconButton from 'material-ui/IconButton'
import {main} from '../styles/common'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import RaisedButton from 'material-ui/RaisedButton'
import {strategyCreate} from '../modules/async/strategy-create'
import TextField from 'material-ui/TextField'
import React, {Component, PropTypes} from 'react'
import {
  strategyCreateChange,
  strategyCreateReset
} from '../modules/strategy-create'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

const style = {
  margin: 12
}

class StrategyCreate extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    strategyCreateState: PropTypes.object.isRequired
  }

  changeDescription = (event) => {
    const {dispatch} = this.props

    dispatch(strategyCreateChange({description: event.target.value}))
  }

  changeTitle = (event) => {
    const {dispatch} = this.props

    dispatch(strategyCreateChange({title: event.target.value}))
  }

  create = () => {
    const {dispatch, strategyCreateState} = this.props
    const {
      description,
      title
    } = strategyCreateState

    dispatch(strategyCreate({description, title}))
  }

  reset = () => {
    const {dispatch} = this.props

    dispatch(strategyCreateReset())
  }

  render () {
    const {
      strategyCreateState
    } = this.props

    const {
      description,
      title
    } = strategyCreateState
    
    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Create a Strategy' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <IconButton
              onTouchTap={() => {
                this.reset()
                browserHistory.push('/strategies')
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
                browserHistory.push('/strategies')
              }}
            />
            <RaisedButton
              label='Create'
              primary={true}
              style={style}
              onTouchTap={() => {
                this.create()
                this.reset()
                browserHistory.push('/strategies')
              }}
            />
          </div>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  strategyCreateState: state.strategyCreate
}))(StrategyCreate)