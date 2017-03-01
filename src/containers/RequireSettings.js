import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {isEmpty} from 'lib/utils';

export default function(ComposedComponent) {
  class RequireAuth extends Component {

    static propTypes = {
      hasSettings: PropTypes.bool.isRequired,
      router: PropTypes.shape({
        replace: PropTypes.func.isRequired
      }).isRequired
    };

    componentWillMount() {
      if (!this.props.hasSettings) {
        this.props.router.replace('/settings');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.hasSettings) {
        this.props.router.replace('/settings');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => ({
    hasSettings: !isEmpty(state.settings)
  });

  return connect(mapStateToProps)(withRouter(RequireAuth));
}
