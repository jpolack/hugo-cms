import React from 'react';
import { connect } from 'react-redux';
import AUTHENTICATED from '../_actions/AUTHENTICATED';

function Proceed({
  Component, dispatch, accessToken, ...props
}) {
  dispatch(AUTHENTICATED(accessToken));
  console.log('accessToken', accessToken);

  return <Component {...props} />; // eslint-disable-line react/jsx-props-no-spreading
}

export default connect()(Proceed);
