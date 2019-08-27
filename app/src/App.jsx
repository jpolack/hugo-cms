import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './_reducers';
import middlewares from './_middlewares';

import HomeView from './Home';
import RepoView from './Repo';
import authCallback from './Auth/authCallback';
import authenticated from './Auth/authenticated';
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
      <Router>
        <Provider store={store}>
          <Route path="/" exact component={authenticated(HomeView)} />
          <Route path="/repo/:name?/:path*" component={authenticated(RepoView)} />
          <Route path="/file/:name?/:path*/edit" component={authenticated(FileView)} />
          <Route path="/auth" component={authCallback} />
        </Provider>
      </Router>
    </Wrapper>
  );
}

export default App;
