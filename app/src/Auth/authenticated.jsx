import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function AuthHOC(Component) {
  const AuthenticationComponent = (props) => {
    const { authenticationState } = props;
    console.log('authenticationState', authenticationState);

    if (!authenticationState || !authenticationState.accessToken) {
      return (
        <>
          <a href="https://github.com/login/oauth/authorize?client_id=a4cb4f76e6d024f070f6&redirect_uri=http://localhost:3000/token&scope=repo">Login with GitHub</a>
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

  return connect((state) => state)(AuthenticationComponent);
}

export default AuthHOC;
