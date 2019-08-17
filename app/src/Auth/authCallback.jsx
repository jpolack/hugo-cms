import React, { useEffect } from 'react';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function Auth({ location, dispatch }) {
  const { accessToken } = queryString.parse(location.search);

  if (!accessToken) {
    console.error('No accessToken passed');
    return null;
  }

  useEffect(() => {
    localStorage.setItem('HUGO-CMS-accessToken', accessToken);
  }, []);

  return (
    <Redirect to="/" />
  );
}

export default connect()(Auth);
