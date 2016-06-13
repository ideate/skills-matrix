import {header, main} from '../styles/common'
import React, {Component} from 'react'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Help extends Component {
  render () {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup float='left'>
            <ToolbarTitle text='Help' />
          </ToolbarGroup>
        </Toolbar>
      </div>
    )
  }
}

export default Help