import './styles/core.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {Router, hashHistory, applyRouterMiddleware} from 'react-router';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import useScroll from 'react-router-scroll/lib/useScroll';
import {loadSettings} from './actions';
import reducers from './reducers';
import routes from './routes';

const initialState = {};
const router = routerMiddleware(hashHistory);
const store = createStore(reducers, initialState, compose(
  applyMiddleware(thunk, router),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

const history = syncHistoryWithStore(hashHistory, store);
store.dispatch(loadSettings());

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={history}
      render={applyRouterMiddleware(useScroll())}
      routes={routes} />
  </Provider>
  , document.getElementById('root'));
