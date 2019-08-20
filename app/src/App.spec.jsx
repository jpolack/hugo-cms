import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';

const App = require('./App').default;

describe('App', () => {
  it('runs', () => {
    const renderedApp = shallow(<App />);

    expect(renderedApp.find(Provider).length).toBe(1);
    expect(renderedApp.find(Route).length).toBeGreaterThan(0);
  });
});
