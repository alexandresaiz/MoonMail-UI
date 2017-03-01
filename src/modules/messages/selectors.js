import {createSelector} from 'reselect';
import {stateKey} from './reducer';

const messagesSelector = state => state[stateKey];
export const getMessages = createSelector(
  messagesSelector,
  messages => messages.ids.map(id => messages.byId[id])
);
