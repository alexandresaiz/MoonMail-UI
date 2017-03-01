import {reduxForm} from 'redux-form';
import * as actions from 'actions';
import {createValidator} from 'lib/validator';
import SettingsView from './SettingsView';

const mapStateToProps = (state) => ({
  initialValues: state.settings
});

export default reduxForm({
  form: 'settings',
  fields: ['baseUrl', 'emailAddress', 'apiKey', 'apiSecret', 'region', 'token'],
  validate: createValidator({
    baseUrl: 'required|url',
    emailAddress: 'required|email',
    fromName: 'required',
    apiKey: 'required',
    apiSecret: 'required',
    region: 'required'
  })
}, mapStateToProps, actions)(SettingsView);