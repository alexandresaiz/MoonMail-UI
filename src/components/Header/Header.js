import React from 'react';
import Link from 'react-router/lib/Link';
import IndexLink from 'react-router/lib/IndexLink';
import cx from 'classnames';
import classNames from './Header.scss';

const Header = () => (
  <header className="ui inverted blue fixed menu large">
    <div className="ui container">
      <IndexLink to="/" className={cx('ui medium header item', classNames.logo)}>
        <img src="https://static.moonmail.io/moonmail-logo-white.svg" alt="MoonMail" />
      </IndexLink>
      <Link to="/campaign" className="item" activeClassName="active">
        <i className="ui icon send" />
        Send campaign
      </Link>
      <Link to="/settings" className="item right" activeClassName="active">
        <i className="ui icon settings" />
        Settings
      </Link>
    </div>
  </header>
);

export default Header;