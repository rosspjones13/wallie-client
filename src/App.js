import React, { Component } from 'react';
import 'typeface-roboto'
import WalliePage from './containers/WalliePage'
import {BrowserRouter as Router} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router><WalliePage /></Router>
    )
  }
}

export default App;
