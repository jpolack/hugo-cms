import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function withActions(Component, actionCreators = []) {
  const WrapperComponent = (props) => {
    const actions = actionCreators.map((actionCreator) => actionCreator(props));

    useEffect(() => {
      actions.forEach((a) => props.dispatch(a));
    }, []);

    return <Component {...props} />; // eslint-disable-line react/jsx-props-no-spreading
  };

  WrapperComponent.propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  return connect((s) => s)(WrapperComponent);
}

export default withActions;
