import React, {PropTypes} from 'react';
import Message from 'components/Message';
import classNames from './MessagesStack.scss';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const MessagesStack = ({messages, removeMessage}) => (
  <CSSTransitionGroup
    className={classNames.wrapper}
    transitionName="fade"
    transitionEnterTimeout={200}
    transitionLeaveTimeout={200}
    component="div">
    {messages.map(message => (
      <Message
        {...message}
        key={message.id}
        onClose={() => removeMessage(message.id)}
        className={classNames.message} />
    ))}
  </CSSTransitionGroup>
);

MessagesStack.propTypes = {
  messages: PropTypes.array.isRequired,
  removeMessage: PropTypes.func.isRequired
};

export default MessagesStack;
