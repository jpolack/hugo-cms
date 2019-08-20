import React, { useLayoutEffect, useEffect, useState } from 'react';
import SimpleMDE from 'simplemde';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import base64 from 'base-64';
import utf8 from 'utf8';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FETCH_FILEDATA } from '../_actions/FILEDATA';
import { PUSH_FILEEDIT } from '../_actions/FILEEDIT';

function splitMetaAndContent(decodedContent) {
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

function FileView({ dispatch, match, loadState }) {
  useEffect(() => {
    dispatch(FETCH_FILEDATA(match.params.name));
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

    if (loadState.fileData.content) {
      const decodedContent = utf8.decode(base64.decode(loadState.fileData.content));
      const { meta: parsedMetaData, content } = splitMetaAndContent(decodedContent);
      setMeta(parsedMetaData);
      mde.value(content);
    }

    return () => {
      mde.toTextArea();
    };
  }, [loadState.fileData.content]);

  return (
    <>
      {renderMetaData(meta)}
      <textarea id="fileEdit" />
      <Button onClick={() => editor && dispatch(PUSH_FILEEDIT(editor.value(), meta))}>
        Send
      </Button>
    </>
  );
}

export default connect((state) => state)(withRouter(FileView));
