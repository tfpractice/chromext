import Promise from 'bluebird';
import { SORT_TABS, SET_TABS, GET_TABS } from './constants';

export const chromise = () => Promise.resolve(window.chrome);

const set = tabs => state => tabs;

export const setTabs = tabs => ({
  type: SET_TABS,
  curry: set(tabs),
});

const query = (qObj = { currentWindow: true }) =>
  new Promise(cb => chromise().then(chrome => chrome.tabs.query(qObj, cb)));

export const getTabs = () => dispatch =>
  query().then(tabs => dispatch(setTabs(tabs)));

//
// export const move = ({ id, index }) =>
//   new Promise(cb =>
//     chromise().then(chrome => chrome.tabs.move(id, { index }), cb)
//   );
//
// export const compUrl = (a, b) => a.url.localeCompare(b.url);
// export const tabMap = sTabs => sTabs.map(({ id }, index) => ({ id, index }));
//
// const get = qObj => state => tabs;

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
