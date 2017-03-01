import Validator from 'validatorjs';
import dot from 'dot-object';

const messages = Validator.getMessages('en');
messages.required = 'This field is required.';
Validator.setMessages('en', messages);

Validator.register(
  'emailBody',
  value => value.includes('{{unsubscribe_url}}'),
  'Please include {{unsubscribe_url}}'
);

export const createValidator = (rules) => {
  return values => {
    const validator = new Validator(values, rules);
    validator.passes();
    return dot.object(validator.errors.all());
  };
};

export default Validator;
