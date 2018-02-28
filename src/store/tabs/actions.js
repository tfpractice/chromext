import Promise from 'bluebird';
import { SORT_TABS, SET_TABS, MOVE_TAB, GET_TABS } from './constants';

import * as Utils from '../../utils';

const set = tabs => state => tabs;
const noOp = state => [ ...state ];
const sort = order => state => console.log('sort') || [ ...state ].sort(order);

export const setTabs = tabs =>
  console.log('setTabs') || {
    type: SET_TABS,
    curry: set(tabs),
  };

export const getAction = tabs =>
  console.log('getAction') || {
    type: GET_TABS,
    curry: set(tabs),
  };

export const sortAction = order =>
  console.log('sortAction') || {
    type: SORT_TABS,
    curry: sort(order),
  };

export const moveAction = () =>
  console.log('moveAction') || {
    type: MOVE_TAB,
    curry: noOp,
  };

const query = (qObj = { currentWindow: true }) =>
  new Promise(cb =>
    Utils.chromise().then(chrome => chrome.tabs.query(qObj, cb))
  );

export const getTabs = () => dispatch =>
  query()
    .map(Utils.Tabs.setVisitTime)
    .then(tabs => {
      const visits = tabs.map(Utils.History.lastVisit);

      console.log('visits', visits);
      return dispatch(setTabs(tabs));
    });

export const mvPromise = ({ id, index }) =>
  new Promise(cb =>
    Utils.chromise().then(chrome => chrome.tabs.move(id, { index }), cb)
  );

export const moveTab = ({ id, index }) => dispatch =>
  console.log('movetab') ||
  Promise.resolve(mvPromise({ id, index }))
    .then(moveAction)
    .then(dispatch)
    .then(getTabs)
    .then(dispatch);

export const urlSort = () => dispatch =>
  query()
    .map(Utils.Tabs.setVisitTime)
    .then(RES => console.log('RES', RES) || sort(Utils.Tabs.compUrl)(RES))
    .then(Utils.Tabs.tabMap)
    .map(moveTab)
    .map(dispatch);

export const titleSort = () => dispatch =>
  query()
    .map(Utils.Tabs.setVisitTime)
    .then(RES => console.log('RES', RES) || sort(Utils.Tabs.compTitle)(RES))
    .then(Utils.Tabs.tabMap)
    .map(moveTab)
    .map(dispatch);

export const visitSort = () => dispatch =>
  query()
    .map(Utils.Tabs.setVisitTime)
    .then(RES => console.log('RES', RES) || sort(Utils.Tabs.compVisit)(RES))
    .then(r2 => console.log('r2', r2) || Utils.Tabs.tabMap(r2))
    .map(RES1 => console.log('RES1', RES1) || dispatch(moveTab(RES1)))
    .map(RES2 => console.log('RES2', RES2) || dispatch(RES2));

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
