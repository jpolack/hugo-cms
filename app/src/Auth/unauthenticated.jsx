import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyle = makeStyles({
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
});

function Unauthenticated() {
  const classes = useStyle();
  return (
    <Grid container alignItems="flex-start">
      <Typography>
        AA
      </Typography>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12}>
          <Grid container alignItems="center" justify="center">
            <Typography>
              AA
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" justify="center">
            <Button variant="outlined" color="primary">
              <Link className={classes.link} href={`https://github.com/login/oauth/authorize?client_id=${CLIENTID}&redirect_uri=${REDIRECT_URL || 'http://localhost:3000/token'}&scope=repo`}>
                Sign in with GitHub
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Unauthenticated;
