import React from 'react';
import { connect } from 'react-redux';

function Proceed({
  Component, dispatch, accessToken, ...props
}) {
  dispatch({
    type: 'AUTHENTICATE',
    accessToken,
  });
  console.log('accessToken', accessToken);

  return <Component {...props} />; // eslint-disable-line react/jsx-props-no-spreading
}

export default connect()(Proceed);
