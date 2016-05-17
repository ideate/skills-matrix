import {browserHistory} from 'react-router'
import {capabilitiesRead} from '../modules/async/capabilities-read'
import {connect} from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import {main} from '../styles/common'
import RaisedButton from 'material-ui/RaisedButton'
import React, {Component, PropTypes} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Capabilities extends Component {
  static propTypes = {
    capabilitiesState: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentWillMount () {
    const {dispatch} = this.props

    dispatch(capabilitiesRead())
  }

  renderCapabilities () {
    const {capabilitiesState} = this.props

    if(capabilitiesState && capabilitiesState.data && capabilitiesState.data.length){
      return(
        capabilitiesState.data.map(function(capability) {
          return (
            <TableRow key={capability._id}>
              <TableRowColumn>
                <FlatButton
                  label={capability.title}
                  secondary={true}
                  onTouchTap={() => {
                    browserHistory.push(`/capabilities/${capability._id}`)
                  }}
                />
              </TableRowColumn>
              <TableRowColumn>{capability.description}</TableRowColumn>
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
            <ToolbarTitle text='Capabilities' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Create'
              primary={true}
              onTouchTap={() => (browserHistory.push('/capabilities/create'))}
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
                <TableHeaderColumn>Capability</TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              {this.renderCapabilities()}
            </TableBody>
          </Table>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  capabilitiesState: state.capabilities
}))(Capabilities)