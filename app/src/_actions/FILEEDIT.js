export const PUSH_FILEEDIT = (fileContent, metaData) => ({
  type: 'PUSH_FILEEDIT',
  fileContent,
  metaData,
});

export const PUSHED_FILEEDIT = () => ({
  type: 'PUSHED_FILEEDIT',
});
