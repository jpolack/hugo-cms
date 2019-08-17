import React, { useLayoutEffect, useEffect, useState } from 'react';
import SimpleMDE from 'simplemde';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import { FETCH_FILEDATA } from '../_actions/FILEDATA';

function b64DecodeUnicode(str) {
  return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
}

function splitMetaAndContent(decodedContent) {
  const match = decodedContent.match(/---(\n.*)*---\n\n/);

  const metaData = match[0] || '';

  return {
    meta: {
      title: metaData.match(/title:\s?"(.*)"/)[1],
      date: metaData.match(/date:\s?(.*)/)[1],
      draft: metaData.match(/draft:\s?(.*)/)[1],
      tags: metaData.match(/tags:\s?(\[.*\])/)[1],
    },
    content: decodedContent.replace(/---(\n.*)*---\n\n/, ''),
  };
}

function FileView({ dispatch, match, loadState }) {
  useEffect(() => {
    dispatch(FETCH_FILEDATA(match.params.name));
  }, []);

  const [meta, setMeta] = useState({
    title: '',
    date: '',
    draft: '',
    tags: '',
  });

  useLayoutEffect(() => {
    const mde = new SimpleMDE({
      element: document.getElementById('fileEdit'),
      spellChecker: false,
    });

    if (loadState.fileData.content) {
      const decodedContent = b64DecodeUnicode(loadState.fileData.content);
      const { meta: parsedMetaData, content } = splitMetaAndContent(decodedContent);
      setMeta(parsedMetaData);
      mde.value(content);
    }

    return () => {
      mde.toTextArea();
    };
  }, [loadState.fileData.content]);
  console.log('meta', meta);

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
        label="Draft"
        value={meta.draft}
      />
      <TextField
        fullWidth
        label="Tags"
        value={meta.tags}
      />
      <textarea id="fileEdit" />
    </>
  );
}

export default connect((state) => state)(withRouter(FileView));
