export const PUSH_FILECREATE = (path, createMetadata) => ({
  type: 'PUSH_FILECREATE',
  path,
  createMetadata,
});

export const PUSHED_FILECREATE = () => ({
  type: 'PUSHED_FILECREATE',
});
