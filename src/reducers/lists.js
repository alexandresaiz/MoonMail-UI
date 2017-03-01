import * as types from 'actions/types';

function listsReducer(state = [], action) {
  switch (action.type) {
    case types.FETCH_LISTS:
      return action.items;
    default:
      return state;
  }
}

export default listsReducer;