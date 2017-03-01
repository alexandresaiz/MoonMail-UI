import React, {Component, PropTypes} from 'react';
import Input from 'components/Input';
import Select, {SelectItem} from 'components/Select';
import Button from 'components/Button';
import CodeEditor from 'components/CodeEditor';

const CampaignView = ({
  fields: {subject, listIds, body},
  handleSubmit,
  invalid,
  lists,
  isSending,
  sendCampaign,
  resetForm
}) => {
  const submit = (formProps) => {
    sendCampaign(formProps).then(resetForm);
  };

  return (
    <section>
      <h1 className="ui centered align header">Send your campaign</h1>
      <form className="ui form" onSubmit={handleSubmit(submit)}>
        <Input type="text" {...subject} />
        <Select multiple label="Lists" {...listIds}>
          {lists.map(({id, name, subscribedCount = 0}) => (
            <SelectItem key={id} value={id}>
              {name} <span style={{opacity: 0.5}}>({subscribedCount})</span>
            </SelectItem>
          ))}
        </Select>
        <CodeEditor
          {...body}
          hint="you need to include {{unsubscribe_url}} tag"
          label="Email body (paste html or drag your html file here)"/>
        <Button
          loading={isSending}
          positive
          type="submit"
          disabled={invalid || isSending}>
          <i className="send icon" />
          Send
        </Button>
      </form>
    </section>
  );
};

CampaignView.propTypes = {
  sendCampaign: PropTypes.func.isRequired,
  fetchLists: PropTypes.func.isRequired,
  lists: PropTypes.array.isRequired,
  isSending: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired
};

export default CampaignView;
