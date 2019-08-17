export const FETCH_REPODATA = (url) => ({
  type: 'FETCH_REPODATA',
  url,
});

export const FETCHED_REPODATA = (repoData) => ({
  type: 'FETCHED_REPODATA',
  repoData,
});
