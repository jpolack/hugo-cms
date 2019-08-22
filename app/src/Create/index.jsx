import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PUSH_FILECREATE } from '../_actions/FILECREATE';

export function CreateDialog({ open, setOpen, dispatch }) {
  const [path, setPath] = useState('');

  return (
    <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create file</DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you want to create a folder you can do that by entering a path
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          placeholder="some/file/index.md"
          label="Filename or Path"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button onClick={() => {
          setOpen(false);
          dispatch(PUSH_FILECREATE(path));
        }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CreateDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(CreateDialog);
