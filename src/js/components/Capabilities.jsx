import {header, main} from '../styles/common'
import React, {Component} from 'react'

class Capabilities extends Component {
  render () {
    return (
      <div>
        <header style={header}>
          <h1>Capabilities</h1>
          <p>A collection of Skills</p>
        </header>
        <main style={main}>
          <h3>Main</h3>
        </main>
      </div>
    )
  }
}

export default Capabilities