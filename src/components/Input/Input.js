import React, {PropTypes} from 'react';
import cx from 'classnames';
import humanize from 'humanize-string';
import {omitProps} from 'lib/utils';

const Input = ({
  invalid,
  error,
  touched,
  fieldClass,
  component,
  label,
  hint,
  ...rest
}) => {
  const Component = component || 'input';
  const labelText = label || humanize(rest.name);
  const errorText = Array.isArray(error) ? error[0] : error;
  const inputProps = omitProps(rest,
    'initialValue',
    'autofill',
    'onUpdate',
    'valid',
    'dirty',
    'pristine',
    'active',
    'visited',
    'autofilled'
  );
  return (
    <div className={cx('field', fieldClass, {error: touched && invalid})}>
      {label !== false && <label>{labelText}</label>}
      <Component {...inputProps} />
      {hint && !(touched && invalid) && <div className="text grey">{hint}</div>}
      {touched && invalid && <div className="ui basic red pointing prompt label">{errorText}</div>}
    </div>

  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func
  ]),
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  fieldClass: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]),
  touched: PropTypes.bool,
  invalid: PropTypes.bool,
  hint: PropTypes.string
};

export default Input;
