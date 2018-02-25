import React from 'react';
import { connect } from 'react-redux';
import { Actions } from '../../store';

const mapState = ({ tabs }) => ({ tabs });

const Tabs = ({ tabs, getTabs }) => (
  <main>
    <h1>these are your tabss</h1>
    <button onClick={getTabs}>getTabs</button>
    <ul>{tabs.map(t => <li>{JSON.stringify(t)}</li>)}</ul>
  </main>
);

export default connect(mapState, Actions.Tabs)(Tabs);
