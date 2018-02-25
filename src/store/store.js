import thunk from 'redux-thunk';
import log from 'redux-logger';
import { applyMiddleware as middify, createStore } from 'redux';

import red from './reducer';

//
// const predicate = (getState, action) => false;
// const collapsed = (getState, action) => action.type;
// const log = createLogger({ collapsed, predicate });

export default state => middify(thunk, log)(createStore)(red, state);
