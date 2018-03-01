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

const { Tabs: { query, move }} = Utils;

const addDate = tab => ({ ...tab, createdAt: Date.now() });

const set = tabs => state => tabs;
const noOp = state => [ ...state ];
const sort = order => state => [ ...state ].sort(order);
const create = tab => state => [ ...state, tab ];
const drop = ({ id }) => state => state.filter(t => t.id !== id);

export const createTab = tab => ({
  type: CREATE_TAB,
  curry: create(addDate(tab)),
});

export const dropTab = tab => ({
  type: DROP_TAB,
  curry: drop(tab),
});

export const setTabs = tabs => ({
  type: SET_TABS,
  curry: set(tabs),
});

export const getAction = tabs => ({
  type: GET_TABS,
  curry: noOp,
});

export const sortAction = order => ({
  type: SORT_TABS,
  curry: sort(order),
});

export const moveAction = () => ({
  type: MOVE_TAB,
  curry: noOp,
});

export const getTabs = () => dispatch =>
  query()
    .map(Utils.Tabs.setVisitTime)
    .then(setTabs)
    .then(dispatch);

export const moveTab = ({ id, index }) => dispatch =>
  move({ id, index })
    .then(moveAction)
    .then(dispatch)
    .then(getTabs)
    .then(dispatch);

export const urlSort = () => dispatch =>
  query()
    .map(Utils.Tabs.setVisitTime)
    .then(sort(Utils.Tabs.compUrl))
    .then(Utils.Tabs.tabMap)
    .map(moveTab)
    .map(dispatch);

export const titleSort = () => dispatch =>
  query()
    .map(Utils.Tabs.setVisitTime)
    .then(sort(Utils.Tabs.compTitle))
    .then(Utils.Tabs.tabMap)
    .map(moveTab)
    .map(dispatch);

export const visitSort = () => dispatch =>
  query()
    .map(Utils.Tabs.setVisitTime)
    .then(sort(Utils.Tabs.compVisit))
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
