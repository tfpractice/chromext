import Promise from 'bluebird';
import {
  SORT_TABS,
  CREATE_TAB,
  DROP_TAB,
  SET_TABS,
  MOVE_TAB,
  GET_TABS,
} from './constants';

import * as Utils from '../../utils';

const { Tabs: { query, timeQuery, move }} = Utils;
const cTime = t => t.createdAt || t.lastVisitTime || Date.now();
const addDate = tab => ({ ...tab, createdAt: cTime(tab) });
const add = tab => state =>
  new Set(state.map(({ id }) => id)).has(tab.id)
    ? state
    : [ ...state, addDate(tab) ];
const addBin = (state, tab) => add(tab)(state);

const set = tabs => state => tabs.reduce(addBin, state);
const noOp = state => [ ...state ];
const sort = order => state => [ ...state ].sort(order);
const create = tab => state => add(tab)(state);
const drop = ({ id }) => state => state.filter(t => t.id !== id);

const moveFn = ({ id, index }) => state =>
  [ ...state ]
    .map(t => (t.id === id ? null : t))
    .slice(0, index)
    .concat(state.find(u => u.id === id))
    .concat(drop({ id })(state.slice(index)))
    .filter(x => x);

export const createTab = tab => ({
  type: CREATE_TAB,
  curry: create(tab),
});

export const dropTab = tab => ({
  type: DROP_TAB,
  curry: drop(tab),
});

export const setTabs = tabs => ({
  type: SET_TABS,
  curry: set(tabs.map(addDate)),
});

export const getAction = tabs => ({
  type: GET_TABS,
  curry: noOp,
});

export const sortAction = order => ({
  type: SORT_TABS,
  curry: sort(order),
});

export const moveAction = ({ id, index }) => ({
  type: MOVE_TAB,
  curry: moveFn({ id, index }),
});

export const getTabs = () => dispatch =>
  timeQuery()
    .then(setTabs)
    .then(dispatch);

export const moveTab = ({ id, index }) => dispatch =>
  move({ id, index })
    .then(moveAction)
    .then(dispatch);

export const urlSort = () => (dispatch, getState) => {
  console.log('getState()', getState());
  return timeQuery()
    .then(sort(Utils.Tabs.compUrl))
    .then(Utils.Tabs.tabMap)
    .map(moveTab)
    .map(dispatch);
};

export const titleSort = () => dispatch =>
  timeQuery()
    .then(sort(Utils.Tabs.compTitle))
    .then(Utils.Tabs.tabMap)
    .map(moveTab)
    .map(dispatch);

export const visitSort = () => (dispatch, getState) =>
  Promise.resolve(getState().tabs)
    .then(sort(Utils.Tabs.compDate))
    .then(Utils.Tabs.tabMap)
    .map(moveTab)
    .map(dispatch);

// const TabObj = {
//   active: false,
//   audible: false,
//   autoDiscardable: true,
//   discarded: false,
//   height: 960,
//   highlighted: false,
//   id: 217,
//   incognito: false,
//   index: 9,
//   pinned: false,
//   selected: false,
//   status: 'complete',
//   width: 1731,
//   url: 'https://developer.chrome.com/apps/permissions',
//   windowId: 1,
// };
