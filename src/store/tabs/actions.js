import Promise from 'bluebird';
import { SORT_TABS, SET_TABS, MOVE_TAB, GET_TABS } from './constants';

import * as Utils from '../../utils';

// const { Tabs: { setVisitTime }} = Utils;

console.log('Utils', Utils);
export const chromise = () => Promise.resolve(window.chrome);

const set = tabs => state => tabs;
const noOp = state => state;

export const setTabs = tabs => ({
  type: SET_TABS,
  curry: set(tabs),
});

const query = (qObj = { currentWindow: true }) =>
  new Promise(cb => chromise().then(chrome => chrome.tabs.query(qObj, cb)));

export const getTabs = () => dispatch =>
  query()
    .map(Utils.Tabs.setVisitTime)
    .then(tabs => {
      const visits = tabs.map(Utils.History.lastVisit);

      console.log('visits', visits);
      return dispatch(setTabs(tabs));
    });

export const mvTabs = () => ({
  type: MOVE_TAB,
  curry: noOp,
});

export const mvPromise = ({ id, index }) =>
  new Promise(cb =>
    chromise().then(chrome => chrome.tabs.move(id, { index }), cb)
  );

export const moveTabs = ({ id, index }) => dispatch =>
  Promise.resolve(mvPromise({ id, index }))
    .then(mvTabs)
    .then(dispatch)
    .then(getTabs)
    .then(dispatch);

const TabObj = {
  active: false,
  audible: false,
  autoDiscardable: true,
  discarded: false,
  height: 960,
  highlighted: false,
  id: 217,
  incognito: false,
  index: 9,
  pinned: false,
  selected: false,
  status: 'complete',
  width: 1731,
  url: 'https://developer.chrome.com/apps/permissions',
  windowId: 1,
};
