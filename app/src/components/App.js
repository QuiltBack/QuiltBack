import React, { Component } from 'react';
import '../styles/App.css';
import Login from './login/Login';
import Header from './common/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Login/>
      </div>
    );
  }
}

export default App
