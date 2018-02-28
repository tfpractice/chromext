import React, { Component } from 'react';
import Promise from 'bluebird';
import moment from 'moment';
import logo from './logo.svg';
import { Tabs as TabUtils, History } from '../../utils';
import Tabs from '../tabs';
import './app.css';

const { tabMap, query, compUrl, url, move } = TabUtils;
const { searchUrl } = History;
const sortTabs = tabs => tabs.sort(compUrl);

const queryTabs = () => {
  query({ currentWindow: true })
    .then(sortTabs)
    .then(tabs => {
      Promise.resolve(tabs)
        .map(url)
        .map(searchUrl)
        .map(res => {
          console.log('res', res);
          console.log(
            'moment(res.lastVisitTime)',
            moment(res.lastVisitTime).format('HH/DD/MM')
          );
        });
      return tabs;
    })
    .then(tabMap)
    .map(move)

    // .then(tabs => {
    //   console.log('text: tabs[0].url', tabs[0]);
    //   window.chrome.history.search({ text: tabs[0].url }, res => {
    //     console.log('res', res);
    //   });
    //
    //   return Promise.all(tabs.map(move));
    // })
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
