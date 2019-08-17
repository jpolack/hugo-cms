import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './Home';
import Repo from './Repo';
import authCallback from './Auth/authCallback';
import authenticated from './Auth/authenticated';

import createStore from './_reducers';

const store = createStore();

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Route path="/" exact component={authenticated(Home)} />
        <Route path="/repo/:name?/:path*" component={authenticated(Repo)} />
        <Route path="/auth" component={authCallback} />
      </Provider>
    </Router>
  );
}

export default App;
