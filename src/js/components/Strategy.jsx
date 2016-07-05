import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {main} from '../styles/common'
import RaisedButton from 'material-ui/RaisedButton'
import Select from 'react-select'
import {strategyDelete} from '../modules/async/strategy-delete'
import {strategyRead} from '../modules/async/strategy-read'
import {strategyReset} from '../modules/strategy'
import TextField from 'material-ui/TextField'
import {
  displayskills,
  displaystrategies,
  displayStrategies,
  displaystrategy
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

class Strategy extends Component {
  
  state = {
    open: false
  }
  
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
  
  handleOpen = () => {
    this.setState({open: true})
  }
  
  handleClose = () => {
    this.setState({open: false})
  }
  
  handleDelete = () => {
    this.setState({open: false})
    this.delete()
    browserHistory.push(`/${displaystrategies}`)
  }
  
  reset = () => {
    const {dispatch} = this.props

    dispatch(strategyReset())
  }

  render () {
    const {
      strategyState
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
              label={`${displayStrategies} /`}
              labelStyle={style.buttonLabel}
              style={style.button}
              onTouchTap={() => {
                browserHistory.push(`/${displaystrategies}`)
              }}
            />
            <ToolbarTitle
              text={`${strategyState.title}`}
            />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Edit'
              primary={true}
              onTouchTap={() => (browserHistory.push(`/${displaystrategies}/${this.props.params.id}/edit`))}
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
              Are you sure you want to delete this {displaystrategy}?
            </Dialog>
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
          <br />
          <div>
            {this.renderSkills(strategyState.skills)}
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
  strategyState: state.strategy
}))(Strategy)