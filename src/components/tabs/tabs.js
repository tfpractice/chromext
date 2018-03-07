import React from 'react';
import { connect } from 'react-redux';
import { Actions } from '../../store';
import { Tabs as TabUtils } from '../../utils';

const { dloads } = TabUtils;

const logLoads = () =>
  dloads().then(res => {
    console.log('res', res);
  });
const mapState = ({ tabs }) => ({ tabs });

const Tabs = ({ tabs, getTabs, urlSort, titleSort, visitSort }) => (
  <main>
    <h1>these are your tabss</h1>
    <button onClick={getTabs}>getTabs</button>
    <button onClick={urlSort}>urlSort</button>
    <button onClick={titleSort}>titleSort</button>
    <button onClick={visitSort}>visitSort</button>
    <button onClick={logLoads}>logLoads</button>
    <ul>{tabs.map(t => <li>{TabUtils.title(t)}</li>)}</ul>
  </main>
);

export default connect(mapState, Actions.Tabs)(Tabs);
