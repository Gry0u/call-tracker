import React from 'react'
import { Link } from 'react-router-dom'

import GoogleAuth from './GoogleAuth'

const Header = () => {
  return (
    <React.Fragment>
      <h1 className="ui block header">Call Tracker</h1>
      <div className="ui pointing menu">
        <Link to="/" className="item">Register call</Link>
        <Link to="/results" className="item">Results</Link>
        <div className="right menu">
          <GoogleAuth className="item" />
        </div>
      </div>
    </React.Fragment>

  )
}

export default Header
