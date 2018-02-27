import './index.css';
import Promise from 'bluebird';
import React from 'react';
import Main from './components';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import getStore from './store';
import { Provider } from 'react-redux';
import { registerEvents } from './utils';

global.Promise = Promise;

ReactDOM.render(
  <Provider store={registerEvents(window.chrome)(getStore())}>
    <Main />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
