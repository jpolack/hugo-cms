import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

// NEEDS REFACTORING
function withLoading(Component, evalIsLoading) {
  let renderedComp = null;

  const WrapperComponent = (props) => {
    const isLoading = evalIsLoading(props);
    renderedComp = <Component {...props} />; // eslint-disable-line react/jsx-props-no-spreading

    if (isLoading) {
      return <CircularProgress />;
    }

    return renderedComp;
  };
  return WrapperComponent;
}

export default withLoading;
