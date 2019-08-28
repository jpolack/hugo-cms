import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
    <Box flex={1} display="flex" flexDirection="column">
      <Typography>
          Hugo is a static site generator. For further information about Hugo see the official&nbsp;
        <Link className={classes.link} href="https://gohugo.io/">
            Hugo Website
        </Link>
          .
        <br />
        <br />
          Hugo CMS is a tool that helps you maintaining your static generated Hugo website.
          Please keep in mind that your code must be
          hosted on GitHub to maintiain it with this tool.
        <br />
        <br />
          This application is still under development.
          To file any bugs or improvements please open an issue on&nbsp;
        <Link className={classes.link} href="https://github.com/jpolack/hugo-cms">
            GitHub
        </Link>
          .
      </Typography>
      <Box flex={10} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Typography>
          Get started now
        </Typography>
        <Button variant="outlined" color="primary">
          <Link className={classes.link} href={`https://github.com/login/oauth/authorize?client_id=${CLIENTID}&redirect_uri=${REDIRECT_URL || 'http://localhost:3000/token'}&scope=repo`}>
            Sign in with GitHub
          </Link>
        </Button>
      </Box>
    </Box>
  );
}

export default Unauthenticated;
