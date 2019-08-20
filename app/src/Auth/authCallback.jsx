import React, { useEffect } from 'react';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { AUTHENTICATED } from '../_actions/AUTH';

function Auth({ location, dispatch }) {
  const { accessToken } = queryString.parse(location.search);

  if (!accessToken) {
    console.error('No accessToken passed');
    return null;
  }

  useEffect(() => {
    dispatch(AUTHENTICATED(accessToken));
  }, []);

  return (
    <Redirect to="/" />
  );
}

Auth.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Auth);
