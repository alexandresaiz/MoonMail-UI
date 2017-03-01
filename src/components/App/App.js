import React, {PropTypes} from 'react';
import Header from 'components/Header';
import MessagesStack from 'components/MessagesStack'

const App = ({children}) => (
  <div>
    <Header />
    <section className="ui main container">
      <MessagesStack />
      {children}
    </section>
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;