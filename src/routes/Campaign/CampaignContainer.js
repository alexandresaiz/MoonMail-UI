import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from 'actions';
import CampaignView from './CampaignView';
import {createValidator} from 'lib/validator';

class Campaign extends Component {
  static propTypes = {
    fetchLists: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchLists();
  }

  render() {
    return (
      <CampaignView {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  lists: state.lists,
  isSending: state.isSending
});

export default reduxForm({
  form: 'campaign',
  fields: ['subject', 'listIds', 'body'],
  validate: createValidator({
    subject: 'required',
    listIds: 'required',
    body: 'required|emailBody'
  })
}, mapStateToProps, actions)(Campaign);