import { FETCH_REPODETAILDATA } from '../_actions/REPODETAILDATA';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({
    someAcceptedResult: true,
  }),
}));

const repoDetailData = require('./repoDetailData');

const customMiddleWare = repoDetailData.default;

describe('repoDetailDataLoader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetchesRepoData', async () => {
    let ran = false;
    await customMiddleWare({
      getState: () => ({
        authenticationState: {
          accessToken: 'someAccessToken',
        },
        loadState: {
          repoData: {
            repositories: [{
              name: 'someRepoName',
              contents_url: 'someUrl/{+path}',
            }],
          },
        },
      }),
    })((action) => {
      expect(action.type).toEqual('FETCHED_REPODETAILDATA');
      expect(action.repoDetailData).toEqual({
        someAcceptedResult: true,
      });
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('someUrl/somePath', {
        headers: {
          Authorization: 'Bearer someAccessToken',
        },
      });
      ran = true;
    })(FETCH_REPODETAILDATA('someRepoName', 'somePath'));

    expect(ran).toBe(true);
  });

  it('fetchesRepoData with no path', async () => {
    let ran = false;
    await customMiddleWare({
      getState: () => ({
        authenticationState: {
          accessToken: 'someAccessToken',
        },
        loadState: {
          repoData: {
            repositories: [{
              name: 'someRepoName',
              contents_url: 'someUrl/{+path}',
            }],
          },
        },
      }),
    })((action) => {
      expect(action.type).toEqual('FETCHED_REPODETAILDATA');
      expect(action.repoDetailData).toEqual({
        someAcceptedResult: true,
      });
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('someUrl', {
        headers: {
          Authorization: 'Bearer someAccessToken',
        },
      });
      ran = true;
    })(FETCH_REPODETAILDATA('someRepoName', undefined));

    expect(ran).toBe(true);
  });

  it('skips', async () => {
    let ran = false;
    await customMiddleWare({
      getState: () => {},
    })((action) => {
      expect(action.type).toEqual('someThingDifferent');
      ran = true;
    })({ type: 'someThingDifferent' });

    expect(ran).toBe(true);
  });
});
