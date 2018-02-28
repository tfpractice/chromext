import Promise from 'bluebird';
import { searchUrl, lastVisit } from './history';

export const url = ({ url }) => url;
export const title = ({ title }) => title;

export const compUrl = (a, b) => a.url.localeCompare(b.url);
export const compTitle = (a, b) => a.title.localeCompare(b.title);
export const tabMap = tArr => tArr.map(({ id }, index) => ({ id, index }));

export const chromise = () => Promise.resolve(window.chrome);
export const query = qObj =>
  new Promise(cb => chromise().then(chrome => chrome.tabs.query(qObj, cb)));

export const move = ({ id, index }) =>
  new Promise(cb =>
    chromise().then(chrome => chrome.tabs.move(id, { index }), cb)
  );

export const setVisitTime = tab =>
  searchUrl(url(tab)).then(v => ({ ...tab, lastVisitTime: lastVisit(v) }));

//
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
