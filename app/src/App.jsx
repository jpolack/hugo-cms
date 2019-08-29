import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './_reducers';
import middlewares from './_middlewares';

import HomeView from './Home';
import RepoView from './Repo';
import authCallback from './Auth/authCallback';
import withAuthHoc from './Auth/withAuth';
import FileView from './File';
import Wrapper from './Wrapper';

let oldState = JSON.parse(localStorage.getItem('HUGO-CMS-state'));

if (oldState) {
  console.log('Reloaded old state');
} else {
  oldState = {
    authenticationState: undefined,
    loadState: undefined,
  };
}

let store;
if (NODE_ENV !== 'production') {
  const { composeWithDevTools } = require('redux-devtools-extension'); // eslint-disable-line global-require, import/no-extraneous-dependencies
  store = createStore(reducers, oldState, composeWithDevTools(middlewares));
} else {
  store = createStore(reducers, oldState, middlewares);
}


function App() {
  return (
    <Wrapper>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact component={withAuthHoc(HomeView)} />
            <Route path="/repo/:name?/:path*" component={withAuthHoc(RepoView)} />
            <Route path="/file/:name?/:path*/edit" component={withAuthHoc(FileView)} />
            <Route path="/auth" component={authCallback} />
            <Route component={() => <Redirect to="/" />} />
          </Switch>
        </Router>
      </Provider>
    </Wrapper>
  );
}

export default App;
