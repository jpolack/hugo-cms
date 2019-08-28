import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';
import Box from '@material-ui/core/Box';

const useStyle = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

function Container({
  children,
}) {
  const classes = useStyle();
  return (
    <Box display="flex" flex={1} flexDirection="column">
      <Box className={classes.header} padding={2}>
        <Typography variant="h1">Hugo CMS</Typography>
      </Box>
      <Box flex={1} padding={2} display="flex" flexDirection="column" alignItems="flex-start">
        {children}
      </Box>
    </Box>
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
