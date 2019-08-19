import React from 'react';
import { connect } from 'react-redux'

function AuthHOC(Component) {
  const AuthenticationComponent = (props) => {
    const { authenticationState } = props
    console.log("authenticationState", authenticationState)

    if (!authenticationState || !authenticationState.accessToken) {
      return (
        <>
          <a href="https://github.com/login/oauth/authorize?client_id=a4cb4f76e6d024f070f6&redirect_uri=http://localhost:3000/token&scope=repo">Login with GitHub</a>
        </>
      );
    }

    return <Component {...props} />;
  };
  
  return connect(state => state)(AuthenticationComponent)
}

export default AuthHOC;
