import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { applyMiddleware as middify, createStore } from 'redux';

import red from './reducer';

//
// const predicate = (getState, action) => false;
const collapsed = (getState, action) => false; // action.type;
const log = createLogger({ collapsed });

export default state => middify(thunk, log)(createStore)(red, state);
