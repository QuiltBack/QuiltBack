import React, { Component } from 'react';
import Routes from '../Routes';
import '../styles/App.css';
import '../styles/Header.css';
import '../styles/HomePage.css';
import Header from './common/Header';
import Footer from './common/Footer';
import HomePage from './home/HomePage';
import Dashboard from './dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <section className="App">
        <Dashboard/>
        <div>
        <Header/>
            {Routes}
        <Footer/>
        </div>
      </section>
    );
  }
}

export default App;
