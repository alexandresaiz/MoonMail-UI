import * as types from 'actions/types';

function settingsReducer(state = {}, action) {
  switch (action.type) {
    case types.SAVE_SETTINGS:
    case types.LOAD_SETTINGS:
      return action.settings;
    default:
      return state;
  }
}

export default settingsReducer;
