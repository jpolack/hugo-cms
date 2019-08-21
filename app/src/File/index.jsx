import React, { useLayoutEffect, useEffect, useState } from 'react';
import SimpleMDE from 'simplemde';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import base64 from 'base-64';
import utf8 from 'utf8';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { FETCH_FILEDATA } from '../_actions/FILEDATA';
import { PUSH_FILEEDIT } from '../_actions/FILEEDIT';

export function splitMetaAndContent(decodedContent) {
  const match = decodedContent.match(/---(\n.*)*---\n\n/);

  if (!match) {
    return {
      meta: undefined,
      content: decodedContent.replace(/---(\n.*)*---\n\n/, ''),
    };
  }

  const metaData = match[0];

  return {
    meta: {
      title: metaData.match(/title:\s?"(.*)"/)[1],
      date: metaData.match(/date:\s?(.*)/)[1],
      draft: metaData.match(/draft:\s?(.*)/)[1],
      weight: metaData.match(/weight:\s?([0-9]+)/)[1],
      tags: metaData.match(/tags:\s?(\[.*\])/)[1],
    },
    content: decodedContent.replace(/---(\n.*)*---\n\n/, ''),
  };
}

function renderMetaData(meta) {
  if (!meta) {
    return null;
  }
  return (
    <>
      <TextField
        fullWidth
        label="Title"
        value={meta.title}
      />
      <TextField
        fullWidth
        label="Date"
        value={meta.date}
      />
      <TextField
        fullWidth
        label="Weight"
        value={meta.weight}
      />
      <TextField
        fullWidth
        label="Draft"
        value={meta.draft}
      />
      <TextField
        fullWidth
        label="Tags"
        value={meta.tags}
      />
    </>
  );
}

export function File({
  history,
  dispatch,
  match,
  loadState,
}) {
  useEffect(() => {
    dispatch(FETCH_FILEDATA(match.params.path));
  }, []);

  const [editor, setEditor] = useState(undefined);
  const [meta, setMeta] = useState({
    title: '',
    date: '',
    draft: '',
    weight: '',
    tags: '',
  });

  useLayoutEffect(() => {
    const mde = new SimpleMDE({
      element: document.getElementById('fileEdit'),
      spellChecker: false,
    });

    setEditor(mde);

    let currentContent = loadState.fileData.content;
    if (!currentContent) {
      currentContent = '';
    }

    const decodedContent = utf8.decode(base64.decode(currentContent));
    const { meta: parsedMetaData, content } = splitMetaAndContent(decodedContent);
    setMeta(parsedMetaData);
    mde.value(content);

    return () => {
      mde.toTextArea();
    };
  }, [loadState.fileData.content]);

  return (
    <>
      <IconButton onClick={() => history.goBack()}>
        <Icon>keyboard_backspace</Icon>
      </IconButton>
      {renderMetaData(meta)}
      <textarea id="fileEdit" />
      <Button onClick={() => editor && dispatch(PUSH_FILEEDIT(editor.value(), meta))}>
        Send
      </Button>
    </>
  );
}

File.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  loadState: PropTypes.shape({
    fileData: PropTypes.shape({
      content: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect((state) => state)(withRouter(File));
