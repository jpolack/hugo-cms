import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { FETCH_USERDATA } from '../_actions/USERDATA';
import { FETCH_REPODATA } from '../_actions/REPODATA';

function Home({
  authenticationState, loadState, history, dispatch,
}) {
  useEffect(() => {
    dispatch(FETCH_USERDATA());
  }, []);

  useEffect(() => {
    if (!loadState.userData.repos_url) {
      return;
    }
    dispatch(FETCH_REPODATA(loadState.userData.repos_url));
  }, [loadState.userData.repos_url]);

  return (
    <>
      <Typography variant="h1">
        Select a repository
      </Typography>
      <List>
        {loadState.repoData.map((repo) => (
          <ListItem button key={repo.name} onClick={() => history.push(`/repo/${repo.name}`)}>
            <ListItemText primary={repo.name} />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default connect((state) => state)(withRouter(Home));
