import React from 'react';
import { shallow } from 'enzyme';
import Unauthenticated from './unauthenticated';

const { AuthHOC } = require('./authenticated');

describe('AuthHOC', () => {
  it('forwards correctly', () => {
    const authenticationState = {
      accessToken: 'abc',
    };

    function ANamedComponent(props) {
      expect(props).toEqual({ authenticationState });
      return <></>;
    }
    const EvaluatedHOC = AuthHOC(ANamedComponent);

    const renderedAuth = shallow(<EvaluatedHOC authenticationState={authenticationState} />);

    expect(renderedAuth.find(ANamedComponent).length).toBe(1);
    expect(renderedAuth.find(Unauthenticated).length).toBe(0);
  });

  it('rejects correctly', () => {
    const authenticationState = {
      accessToken: undefined,
    };

    function ANamedComponent() {
      return <></>;
    }
    const EvaluatedHOC = AuthHOC(ANamedComponent);

    const renderedAuth = shallow(<EvaluatedHOC authenticationState={authenticationState} />);

    expect(renderedAuth.find(ANamedComponent).length).toBe(0);
    expect(renderedAuth.find(Unauthenticated).length).toBe(1);
  });
});
