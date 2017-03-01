import * as types from './types';
import {combineReducers} from 'redux';

export const stateKey = 'messages';

const ids = (state = [], action) => {
  switch (action.type) {
    case types.ADD_MESSAGE:
      return [...state, action.messageId];
    case types.REMOVE_MESSAGE:
      const index = state.indexOf(action.messageId);
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_MESSAGE:
      return {...state, ...action.byId};
    case types.REMOVE_MESSAGE:
      const newState = {...state};
      delete newState[action.messageId];
      return newState;
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId
});

