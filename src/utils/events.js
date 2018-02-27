import { Actions } from '../store';

const { Tabs } = Actions;

const registerEvents = chrome => store => {
  chrome.tabs.onCreated.addListener(() => store.dispatch(Tabs.getTabs()));

  chrome.tabs.onRemoved.addListener(() => store.dispatch(Tabs.getTabs()));

  return store;
};

export default registerEvents;
