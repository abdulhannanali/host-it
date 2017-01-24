import React, { Component } from 'react';
import logo from './logo.svg';
import DragCard from './components/DragCard'
import FbUpload from './FbUpload'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={'Firebase_16-logo.png'} className="Fb-logo" alt="logo" />
          <h2>Firebase File Upload Demo using ReactJS</h2>
          <p className='description-text'>Get started building your web apps using <a href="https://firebase.google.com" className="Firebase-text">Firebase</a> by Google</p>
        </div>
        <div className="App-body">
          <FbUpload />
        </div>
      </div>
    );
    
  }
}

export default App;
