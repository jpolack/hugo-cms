import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Checkbox from '@material-ui/core/Checkbox';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PUSH_FILECREATE } from '../_actions/FILECREATE';

export function CreateDialog({ open, setOpen, dispatch }) {
  const [metadata, setMetadata] = useState({
    path: '',
    createMetadata: true,
  });

  return (
    <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create file</DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you want to create a folder you can do that by entering a path
        </DialogContentText>
        <FormControlLabel
          control={(
            <Checkbox
              checked={metadata.createMetadata}
              onChange={(e) => setMetadata({
                ...metadata,
                createMetadata: e.target.checked,
              })}
              color="primary"
            />
          )}
          label="Create Metadata"
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          placeholder="some/file/index.md"
          label="Filename or Path"
          value={metadata.path}
          onChange={(e) => setMetadata({
            ...metadata,
            path: e.target.value,
          })}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button onClick={() => {
          setOpen(false);
          dispatch(PUSH_FILECREATE(metadata.path, metadata.createMetadata));
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
