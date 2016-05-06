import {header, main} from '../styles/common'
import React, {Component} from 'react'

class Help extends Component {
  render () {
    return (
      <div>
        <header style={header}>
          <h1>Help</h1>
        </header>
        <main style={main}>
          <h3>Main</h3>
        </main>
      </div>
    )
  }
}

export default Help