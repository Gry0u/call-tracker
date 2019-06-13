import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './Header'
import ReasonAdd from './reasons/ReasonAdd'
import Graph from './Graph'

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <p></p>
        <Header />
        <Route path="/" exact component={ReasonAdd} />
        <Route path="/results" exact component={Graph} />
      </BrowserRouter>
    </div>
  )
}

export default App
