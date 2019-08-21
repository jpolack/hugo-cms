import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import { FETCH_USERDATA } from '../_actions/USERDATA';
import { FETCH_REPODATA } from '../_actions/REPODATA';

export function Home({
  loadState, history, dispatch,
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
        {loadState.repoData.repositories.map((repo) => (
          <ListItem button key={repo.name} onClick={() => history.push(`/repo/${repo.name}`)}>
            <ListItemText primary={repo.name} />
          </ListItem>
        ))}
      </List>
    </>
  );
}

Home.propTypes = {
  loadState: PropTypes.shape({
    userData: PropTypes.shape({
      repos_url: PropTypes.string,
    }).isRequired,
    repoData: PropTypes.shape({
      repositories: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect((state) => state)(withRouter(Home));
