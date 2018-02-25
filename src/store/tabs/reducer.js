import { TAB_ACTIONS } from './constants';

const tabs = (state = [], { type, curry }) =>
  TAB_ACTIONS.has(type) ? curry(state) : state;

export default tabs;
