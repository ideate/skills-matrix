import {header, main} from '../styles/common'
import React, {Component} from 'react'

class People extends Component {
  render () {
    return (
      <div>
        <header style={header}>
          <h1>People</h1>
        </header>
        <main style={main}>
          <h3>Main</h3>
        </main>
      </div>
    )
  }
}

export default People