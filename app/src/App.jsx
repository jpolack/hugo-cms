import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './_reducers';
import middlewares from './_middlewares';

import Home from './Home';
import Repo from './Repo';
import authCallback from './Auth/authCallback';
import authenticated from './Auth/authenticated';
import FileView from './File';

const oldState = JSON.parse(localStorage.getItem('HUGO-CMS-state')) || {
  authenticationState: undefined,
  loadState: undefined,
};

if(oldState){
  console.log("Reloaded old state")
}

const store = createStore(reducers, oldState,composeWithDevTools(middlewares));

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Route path="/" exact component={authenticated(Home)} />
        <Route path="/repo/:name?/:path*" component={authenticated(Repo)} />
        <Route path="/file/:name" component={authenticated(FileView)} />
        <Route path="/auth" component={authCallback} />
      </Provider>
    </Router>
  );
}

export default App;
