import {header, main} from '../styles/common'
import React, {Component} from 'react'

class Dashboards extends Component {
  render () {
    return (
      <div>
        <header style={header}>
          <h1>Dashboards</h1>
        </header>
        <main style={main}>
          <h3>Main</h3>
        </main>
      </div>
    )
  }
}

export default Dashboards