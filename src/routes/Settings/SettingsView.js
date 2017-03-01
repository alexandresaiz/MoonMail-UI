import React, {Component, PropTypes} from 'react';
import Input from 'components/Input';
import Select, {SelectItem} from 'components/Select';
import Button from 'components/Button';
import {SES_REGIONS} from 'lib/constants';

const SettingsView = ({
  fields: {
    baseUrl,
    emailAddress,
    apiKey,
    apiSecret,
    region,
    token
  },
  handleSubmit,
  invalid,
  saveSettings
}) => (
  <section>
    <div className="ui text container">
      <h1 className="ui centered align header">Settings</h1>
      <form className="ui form" onSubmit={handleSubmit(saveSettings)}>
        <Input
          {...baseUrl}
          placeholder="https://api.moonmail.io"
          hint="url of your API Gateway without trailing slash"
          label="Base url" />
        <Input {...emailAddress} hint="of your verified SES sender" />
        <Input {...apiKey} label="Access Key ID" />
        <Input {...apiSecret} label="Secret Access Key" />
        <Select {...region}>
          {SES_REGIONS.map(({value, name}, i) => (
            <SelectItem key={i} value={value}>{name}</SelectItem>
          ))}
        </Select>
        <Input
          {...token}
          hint="if you are using JSON Web Tokens in your api as we do"
          label="JWT Token"
          component="textarea" />
        <Button primary type="submit" disabled={invalid}>
          Save
        </Button>
      </form>
    </div>
  </section>
);

SettingsView.propTypes = {
  saveSettings: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired
};

export default SettingsView;
