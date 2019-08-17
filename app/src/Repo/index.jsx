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
        {loadState.repoDetailData.files.map((file) => (
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
