import React, { useState, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';

async function loadRepoFiles(accessToken, repo, subpath) {
  const replacer = subpath
    ? `/${subpath}`
    : '';

  const url = repo.contents_url.replace(/\/\{\+path\}/i, replacer);
  const authorizationHeader = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const repoResult = await fetch(url, authorizationHeader);
  const repoData = await repoResult.json();

  return repoData;
}

function renderIcon(type) {
  switch (type) {
    case 'file':
      return (
        <Icon>create</Icon>
      );
    case 'dir':
      return (
        <Icon>folder</Icon>
      );
    default:
      return (
        <Icon>report</Icon>
      );
  }
}

function Repo({
  authenticationState, loadState, history, match,
}) {
  if (!match.params.name) {
    return <Redirect to="/" />;
  }

  const [repoFiles, setRepoFiles] = useState([]);

  useEffect(() => {
    const loadAndSet = async () => {
      const foundRepo = loadState.repoData.find((repo) => repo.name === match.params.name);
      const data = await loadRepoFiles(authenticationState.accessToken, foundRepo, match.params.path);
      setRepoFiles(data);
    };
    loadAndSet();
  }, [match.params.path]);

  console.log('repoFiles', repoFiles);

  return (
    <>
      <Typography variant="h1">
        Files in
        {' '}
        {match.params.name}
      </Typography>
      <List>
        {repoFiles.map((file) => (
          <ListItem
            button
            key={file.name}
            onClick={
              file.type === 'dir'
                ? () => {
                  history.push(`/repo/${match.params.name}/${file.path}`);
                }
                : () => {}
            }
          >
            <ListItemIcon>
              {renderIcon(file.type)}
            </ListItemIcon>
            <ListItemText primary={file.name} />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default connect((state) => state)(withRouter(Repo));
