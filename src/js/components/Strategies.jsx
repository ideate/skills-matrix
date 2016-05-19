import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import {main} from '../styles/common'
import RaisedButton from 'material-ui/RaisedButton'
import {strategiesRead} from '../modules/async/strategies-read'
import React, {Component, PropTypes} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Strategies extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    strategiesState: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch} = this.props

    dispatch(strategiesRead())
  }

  renderStrategies () {
    const {strategiesState} = this.props

    if (strategiesState && strategiesState.data && strategiesState.data.length) {
      return (
        strategiesState.data.map(function (strategy) {
          return (
            <TableRow key={strategy._id}>
              <TableRowColumn>
                <FlatButton
                  label={strategy.title}
                  secondary={true}
                  onTouchTap={() => {
                    browserHistory.push(`/strategies/${strategy._id}`)
                  }}
                />
              </TableRowColumn>
              <TableRowColumn>{strategy.description}</TableRowColumn>
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
            <ToolbarTitle text='Strategies' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Create'
              primary={true}
              onTouchTap={() => (browserHistory.push('/strategies/create'))}
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
                <TableHeaderColumn>Strategy</TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              {this.renderStrategies()}
            </TableBody>
          </Table>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  strategiesState: state.strategies
}))(Strategies)