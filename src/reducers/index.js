import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as form} from 'redux-form';
import messages from 'modules/messages/reducer';
import settings from './settings';
import lists from './lists';
import isSending from './isSending';

export default combineReducers({
  routing,
  messages,
  form,
  settings,
  lists,
  isSending
});
