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

export const compUrl = (a, b) => {
  console.log('a.url - b.url', a.url < b.url);
  return a.url < b.url;
};

// const queryTabs = () => {
//   const chrome = window.chrome;
//
//   // console.log('chrome', chrome);
//   chrome.tabs.query({ currentWindow: true }, tabs => {
//     console.log('before tabs', tabs);
//     tabs.sort(compUrl);
//     console.log('after tabs', tabs);
//   });
// };
