import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

const useStyle = makeStyles({
  wrapper: {
    marginTop: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
  },
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
});

function Unauthenticated() {
  const classes = useStyle();
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <Button variant="outlined" color="primary">
          <Link className={classes.link} href={`https://github.com/login/oauth/authorize?client_id=${CLIENTID}&redirect_uri=${REDIRECT_URL || 'http://localhost:3000/token'}&scope=repo`}>Login with GitHub</Link>
        </Button>
      </div>
    </div>
  );
}

export default Unauthenticated;
