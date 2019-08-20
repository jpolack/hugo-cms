import React, { useEffect, useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { FETCH_REPODETAILDATA } from '../_actions/REPODETAILDATA';
import CreateDialog from '../Create';

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
    history.push(`/file/${match.params.name}/${file.path}/edit`);
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
  loadState, history, match, dispatch,
}) {
  if (!match.params.name) {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    dispatch(FETCH_REPODETAILDATA(match.params.name, match.params.path));
  }, [match.params.path]);

  const [open, setOpen] = useState(false);

  return (
    <>
      <Typography variant="h1">
        Files in
        {' '}
        {match.params.name}
      </Typography>
      <IconButton onClick={() => history.goBack()}>
        <Icon>keyboard_backspace</Icon>
      </IconButton>
      <IconButton onClick={() => setOpen(true)}>
        <Icon>add</Icon>
      </IconButton>
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
      <CreateDialog open={open} setOpen={setOpen} />
    </>
  );
}

Repo.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
    }).isRequired,
  }).isRequired,
  loadState: PropTypes.shape({
    repoDetailData: PropTypes.shape({
      files: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect((state) => state)(withRouter(Repo));
