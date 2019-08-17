import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

async function loadRepoData(accessToken) {
  const authorizationHeader = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const userResult = await fetch('https://api.github.com/user', authorizationHeader);
  const userData = await userResult.json();

  // all public repos
  const repoResult = await fetch(userData.repos_url, authorizationHeader);
  const repoData = await repoResult.json();

  return {
    repoData,
    userData,
  };
}

function Home({ authenticationState, history, dispatch }) {
  const [repoData, setRepoData] = useState([]);

  useEffect(() => {
    const loadAndSet = async () => {
      const data = await loadRepoData(authenticationState.accessToken);
      setRepoData(data.repoData);
      dispatch({
        type: 'USERDATA',
        userData: data.userData,
      });
      dispatch({
        type: 'REPODATA',
        repoData: data.repoData,
      });
    };
    loadAndSet();
  }, []);

  return (
    <>
      <Typography variant="h1">
        Select a repository
      </Typography>
      <List>
        {repoData.map((repo) => (
          <ListItem button key={repo.name} onClick={() => history.push(`/repo/${repo.name}`)}>
            <ListItemText primary={repo.name} />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default connect((state) => state)(withRouter(Home));
