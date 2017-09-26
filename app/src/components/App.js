import React, { Component } from 'react';
import '../styles/App.css';
import Login from './login/Login';
import Header from './common/Header';
import Footer from './common/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Login/>
        <Footer/>
      </div>
    );
  }
}

export default App
