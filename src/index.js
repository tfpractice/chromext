import './index.css';
import Promise from 'bluebird';
import React from 'react';
import Main from './components';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

global.Promise = Promise;
ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
