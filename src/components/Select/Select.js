import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import {stringToArray} from 'lib/utils';
import humanize from 'humanize-string';

class Select extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    touched: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    multiple: PropTypes.bool,
    allowAdditions: PropTypes.bool,
    init: PropTypes.object,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]),
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func,
      PropTypes.bool
    ]),
    placeholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    fieldClass: PropTypes.string,
    hint: PropTypes.string,
    error: PropTypes.any,
    search: PropTypes.bool,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.any
  };

  componentDidMount() {
    this.element.dropdown({
      onHide: this.props.onBlur,
      onChange: this.onChange,
      allowAdditions: this.props.allowAdditions
    });
    this.selectDefaultValue();
  }

  selectDefaultValue() {
    if (this.props.value) {
      return setTimeout(() => {
        this.element.dropdown('set selected', this.props.value);
      });
    }
    this.element.dropdown('clear');
  }

  onChange = (value) => {
    if (this.props.multiple && typeof value === 'string') {
      value = stringToArray(value);
    }
    this.props.onChange(value);
  };

  componentDidUpdate() {
    this.selectDefaultValue();
  }

  render() {
    const props = this.props;
    const labelText = props.label || humanize(props.name);
    const errorText = Array.isArray(props.error) ? props.error[0] : props.error;
    const dropDownClass = cx('ui dropdown selection', {
      fluid: props.fluid,
      multiple: props.multiple,
      loading: props.loading,
      disabled: props.disabled,
      search: props.search | props.allowAdditions
    });
    return (
      <div className={cx('field', props.fieldClass, {error: props.touched && props.invalid})}>
        {props.label !== false && <label htmlFor={props.name}>{labelText}</label>}
        <div
          className={cx(dropDownClass)}
          ref={s => { this.element = $(s); }}>
          <input name={props.name} id={props.name} type="hidden" />
          <i className="dropdown icon" />
          <div className="default text">{props.placeholder || ''}</div>
          <div className="menu">
            {props.children}
          </div>
        </div>
        {props.hint && !(props.touched && props.invalid) && <div className="hint">{props.hint}</div>}
        {props.touched && props.invalid && <div className="ui basic red pointing prompt label">
          {errorText}
        </div>}
      </div>
    );
  }
}

export default Select;
