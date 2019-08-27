import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';

function Container({
  children,
}) {
  return (
    <div>
      <Typography color="primary" variant="h1" gutterBottom>Hugo CMS</Typography>
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};


const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange,
    error: red,
  },
});

function Wrapper({
  children,
}) {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        {children}
      </Container>
    </ThemeProvider>
  );
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
