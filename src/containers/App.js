import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from '../logo.svg';
import './App.css';

import Home from './Home/Home';
import Discuss from './Discuss/Discuss';
import Chat from './Chat/Chat';
import Login from './Login/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/discuss" component={Discuss} />
          <Route path="/chat" component={Chat} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
