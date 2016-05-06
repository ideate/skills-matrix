import {header, main} from '../styles/common'
import React, {Component} from 'react'

class Skills extends Component {
  render () {
    return (
      <div>
        <header style={header}>
          <h1>Skills</h1>
          <p>View and create skills</p>
        </header>
        <main style={main}>
          <h3>Main</h3>
        </main>
      </div>
    )
  }
}

export default Skills