import { Actions } from '../store';

const { Tabs } = Actions;
const { createTab, dropTab } = Tabs;
const registerEvents = chrome => store => {
  chrome.tabs.onCreated.addListener(t => store.dispatch(createTab(t)));

  chrome.tabs.onRemoved.addListener(id => store.dispatch(dropTab({ id })));

  return store;
};

export default registerEvents;
