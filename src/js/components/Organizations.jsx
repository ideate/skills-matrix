import {header, main} from '../styles/common'
import React, {Component} from 'react'

class Organizations extends Component {
  render () {
    return (
      <div>
        <header style={header}>
          <h1>Organizations</h1>
          <p>A collection of organizations</p>
        </header>
        <main style={main}>
          <h3>Main</h3>
        </main>
      </div>
    )
  }
}

export default Organizations