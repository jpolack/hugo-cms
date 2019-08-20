import React, { useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import { FETCH_REPODETAILDATA } from '../_actions/REPODETAILDATA';

const folderWhiteList = [
  /^content/,
];
const fileWhiteList = [
  /^content\/.*\.md/i,
  /^README\.md/i,
];
function filterView(file) {
  if (file.type === 'dir') {
    return folderWhiteList.some((regex) => regex.test(file.path));
  }
  if (file.type === 'file') {
    return fileWhiteList.some((regex) => regex.test(file.path));
  }
  return false;
}

function handleClick(file, history, match) {
  if (file.type === 'dir') {
    history.push(`/repo/${match.params.name}/${file.path}`);
    return;
  }
  if (file.type === 'file') {
    history.push(`/file/${file.name}`);
  }
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
  authenticationState, loadState, history, match, dispatch,
}) {
  if (!match.params.name) {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    dispatch(FETCH_REPODETAILDATA(match.params.name, match.params.path));
  }, [match.params.path]);

  return (
    <>
      <Typography variant="h1">
        Files in
        {' '}
        {match.params.name}
      </Typography>
      <List>
        {loadState.repoDetailData.files
          .filter(filterView)
          .map((file) => (
            <ListItem
              button
              key={file.name}
              onClick={() => handleClick(file, history, match)}
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
