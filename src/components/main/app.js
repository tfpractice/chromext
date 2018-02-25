import React, { Component } from 'react';
import Promise from 'bluebird';
import logo from './logo.svg';
import { Tabs as TabUtils } from '../../utils';
import Tabs from '../tabs';
import './app.css';

const { tabMap, query, compUrl, move } = TabUtils;

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
        <Tabs />
        <p className="App-intro">To get started, edit and save to reload.</p>
      </div>
    );
  }
}

export default App;
