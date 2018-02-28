import { TAB_ACTIONS } from './constants';

const tabs = (state = [], { type, curry }) => {
  console.log('type, curry', type, curry);
  return TAB_ACTIONS.has(type) ? curry(state) : state;
};

export default tabs;
