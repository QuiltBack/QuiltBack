import React, { Component } from 'react';
import Routes from '../Routes';

import '../styles/App.css';
import Login from './login/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login/>
        {Routes}
      </div>
    );
  }
}

export default App
