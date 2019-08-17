export const FETCH_REPODETAILDATA = (repoName, path) => ({
  type: 'FETCH_REPODETAILDATA',
  repoName,
  path,
});

export const FETCHED_REPODETAILDATA = (repoName, path, repoDetailData) => ({
  type: 'FETCHED_REPODETAILDATA',
  repoName,
  path,
  repoDetailData,
});
