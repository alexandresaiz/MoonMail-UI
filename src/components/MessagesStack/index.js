import MessagesStack from './MessagesStack';
import {connect} from 'react-redux';
import * as actions from 'modules/messages/actions';
import * as selectors from 'modules/messages/selectors';

const mapStateToProps = (state) => ({
  messages: selectors.getMessages(state)
});

export default connect(mapStateToProps, actions)(MessagesStack);
