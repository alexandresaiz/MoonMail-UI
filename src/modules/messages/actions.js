import * as types from './types';
import {getMessages} from './selectors';
import {Schema, normalize} from 'normalizr';

export const messageSchema = new Schema('messages');

let nId = 0;
export const addMessage = (props = {}) => {
  return (dispatch, getState) => {
    const activeMessages = getMessages(getState());
    if (activeMessages.some(msg => msg.text === props.text)) {
      return;
    }
    const message = {
      id: nId,
      delay: 5000,
      style: 'error',
      ...props
    };
    setTimeout(() => {
      dispatch(removeMessage(message.id));
    }, message.delay);
    const normalized = normalize(message, messageSchema);
    dispatch({
      type: types.ADD_MESSAGE,
      byId: normalized.entities.messages,
      messageId: normalized.result
    });
    nId++;
  };
};

export const removeMessage = (messageId) => ({
  type: types.REMOVE_MESSAGE,
  messageId
});

