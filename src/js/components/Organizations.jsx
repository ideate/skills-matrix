import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import {main} from '../styles/common'
import {organizationsRead} from '../modules/async/organizations-read'
import RaisedButton from 'material-ui/RaisedButton'
import React, {Component, PropTypes} from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Organizations extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    organizationsState: PropTypes.object.isRequired
  }

  componentWillMount () {
    const {dispatch} = this.props

    dispatch(organizationsRead())
  }

  renderOrganizations () {
    const {organizationsState} = this.props

    if (organizationsState && organizationsState.data && organizationsState.data.length) {
      return (
        organizationsState.data.map(function (organization) {
          return (
            <TableRow key={organization._id}>
              <TableRowColumn>
                <FlatButton
                  label={organization.title}
                  secondary={true}
                  onTouchTap={() => {
                    browserHistory.push(`/organizations/${organization._id}`)
                  }}
                />
              </TableRowColumn>
              <TableRowColumn>{organization.description}</TableRowColumn>
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
            <ToolbarTitle text='Organizations' />
          </ToolbarGroup>
          <ToolbarGroup float='right'>
            <RaisedButton
              label='Create'
              primary={true}
              onTouchTap={() => (browserHistory.push('/organizations/create'))}
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
                <TableHeaderColumn>Organization</TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
            >
              {this.renderOrganizations()}
            </TableBody>
          </Table>
        </main>
      </div>
    )
  }
}

export default connect((state) => ({
  organizationsState: state.organizations
}))(Organizations)