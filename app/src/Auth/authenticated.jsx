import React from 'react';

import AuthProceed from './authProceed';

function AuthHOC(component) {
  return () => {
    const accessToken = localStorage.getItem('HUGO-CMS-accessToken');

    if (!accessToken) {
      return (
        <>
          <a href="https://github.com/login/oauth/authorize?client_id=a4cb4f76e6d024f070f6&redirect_uri=http://localhost:3000/token&scope=repo">Login with GitHub</a>
        </>
      );
    }

    return <AuthProceed Component={component} accessToken={accessToken} />;
  };
}


export default AuthHOC;
