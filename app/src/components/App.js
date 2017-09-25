import React, { Component } from 'react';
import '../styles/App.css';
import Login from './login/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login/>
      </div>
    );
  }
}

export default App
