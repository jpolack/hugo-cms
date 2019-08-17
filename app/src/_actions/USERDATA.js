export const FETCH_USERDATA = () => ({
  type: 'FETCH_USERDATA',
});

export const FETCHED_USERDATA = (userData) => ({
  type: 'FETCHED_USERDATA',
  userData,
});
