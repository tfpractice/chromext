import { Actions } from '../store';

const { Tabs } = Actions;
const { createTab, dropTab, getTabs } = Tabs;

// window.chrome.runtime.onStartup.addListener(getTabs);

const registerEvents = chrome => store => {
  chrome.tabs.onCreated.addListener(t => store.dispatch(createTab(t)));

  chrome.tabs.onRemoved.addListener(id => store.dispatch(dropTab({ id })));
  store.dispatch(getTabs());
  return store;
};

export default registerEvents;
