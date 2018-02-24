import React, { Component } from 'react';
import logo from './logo.svg';
import { Tabs } from '../../utils';
import './App.css';

const { tabMap, query, compUrl, move } = Tabs;

const sortTabs = tabs => tabs.sort(compUrl);

const queryTabs = () => {
  query({ currentWindow: true })
    .then(sortTabs)
    .then(tabMap)
    .then(tabs => Promise.all(tabs.map(move)))
    .then(all => console.log('all', all));
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={queryTabs}>fliptabs</button>
          <a href="/" target="_blank">
            home
          </a>
        </header>
        <p className="App-intro">To get started, edit and save to reload.</p>
      </div>
    );
  }
}

export default App;
