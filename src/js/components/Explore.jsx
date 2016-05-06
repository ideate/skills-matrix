import {header, main} from '../styles/common'
import React, {Component} from 'react'

class Explore extends Component {
  render () {
    return (
      <div>
        <header style={header}>
          <h1>Explore</h1>
          <p>High-level information about Organizations</p>
        </header>
        <main style={main}>
          <h3>Main</h3>
        </main>
      </div>
    )
  }
}

export default Explore