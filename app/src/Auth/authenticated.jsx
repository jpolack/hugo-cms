import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const AuthHOC = (Component) => {
  const AuthenticationComponent = (props) => {
    const { authenticationState } = props;

    if (!authenticationState || !authenticationState.accessToken) {
      return (
        <>
          <a href={`https://github.com/login/oauth/authorize?client_id=a4cb4f76e6d024f070f6&redirect_uri=${REDIRECT_URL || 'http://localhost:3000/token'}&scope=repo`}>Login with GitHub</a>
        </>
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
