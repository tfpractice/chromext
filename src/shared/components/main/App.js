import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Tabs } from '../../utils';

const queryTabs = () => {
  const chrome = window.chrome;

  // console.log('chrome', chrome);
  chrome.tabs.query({ currentWindow: true }, tabs => {
    console.log('before tabs', tabs);
    tabs.sort(Tabs.compUrl);
    console.log('after tabs', tabs);
  });
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={queryTabs}>fliptabs</button>
        </header>
        <p className="App-intro">To get started, edit and save to reload.</p>
      </div>
    );
  }
}

export default App;
