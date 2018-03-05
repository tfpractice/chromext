import { chromise } from './chrome';
import Promise from 'bluebird';
import { searchUrl, lastVisit, compareBin } from './history';
import acorn from 'acorn';

export const url = ({ url }) => url;
export const title = ({ title }) => title;
export const audible = ({ audible }) => audible;
export const createdAt = ({ createdAt }) => createdAt;

export const compUrl = (a, b) => a.url.localeCompare(b.url);
export const compAudio = (a, b) => audible(a) - audible(b);
export const compTitle = (a, b) => a.title.localeCompare(b.title);
export const compVisit = (a, b) => compareBin(lastVisit(a), lastVisit(b));
export const compCreated = (a, b) => a.createdAt - b.createdAt;

export const tabMap = tArr => tArr.map(({ id }, index) => ({ id, index }));

export const query = (qObj = { currentWindow: true }) =>
  new Promise(cb => chromise().then(chrome => chrome.tabs.query(qObj, cb)));

export const move = ({ id, index }) =>
  new Promise(cb =>
    chromise().then(chrome => chrome.tabs.move(id, { index }, cb))
  );

export const setVisitTime = tab =>
  searchUrl(url(tab)).then(v => ({ ...tab, lastVisitTime: lastVisit(v) }));

export const timeQuery = () => query().map(setVisitTime);

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
