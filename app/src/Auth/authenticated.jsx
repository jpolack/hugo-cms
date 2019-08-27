import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Unauthenticated from './unauthenticated';

export const AuthHOC = (Component) => {
  const AuthenticationComponent = (props) => {
    const { authenticationState } = props;

    if (!authenticationState || !authenticationState.accessToken) {
      return (
        <Unauthenticated />
      );
    }

    return <Component {...props} />; // eslint-disable-line react/jsx-props-no-spreading
  };

  AuthenticationComponent.propTypes = {
    authenticationState: PropTypes.shape({
      accessToken: PropTypes.string,
    }).isRequired,
  };

  return AuthenticationComponent;
};


function connectedAuthHOC(Component) {
  return connect((state) => state)(AuthHOC(Component));
}

export default connectedAuthHOC;
