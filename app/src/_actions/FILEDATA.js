export const FETCH_FILEDATA = (filePath) => ({
  type: 'FETCH_FILEDATA',
  filePath,
});

export const FETCHED_FILEDATA = (fileData) => ({
  type: 'FETCHED_FILEDATA',
  fileData,
});
