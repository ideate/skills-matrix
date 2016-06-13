import {header, main} from '../styles/common'
import React, {Component} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Settings extends Component {
  render () {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Settings' />
          </ToolbarGroup>
        </Toolbar>
      </div>
    )
  }
}

export default Settings