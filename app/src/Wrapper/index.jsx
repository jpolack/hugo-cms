import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';
import Grid from '@material-ui/core/Grid';

const useStyle = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: 20,
  },
}));

function Container({
  children,
}) {
  const classes = useStyle();
  return (
    <Grid container alignItems="flex-start">
      <Grid item xs={12} className={classes.header}>
        <Typography variant="h1">Hugo CMS</Typography>
      </Grid>
      {children}
    </Grid>
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
