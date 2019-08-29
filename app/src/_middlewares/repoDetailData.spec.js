import { FETCH_REPODETAILDATA, FETCHED_REPODETAILDATA } from '../_actions/REPODETAILDATA';

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
    const nextMock = jest.fn();
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
    })(nextMock)(FETCH_REPODETAILDATA('someRepoName', 'somePath'));

    expect(nextMock).toHaveBeenCalledTimes(2);
    expect(nextMock).toHaveBeenNthCalledWith(1, FETCH_REPODETAILDATA('someRepoName', 'somePath'));
    expect(nextMock).toHaveBeenNthCalledWith(2, FETCHED_REPODETAILDATA('someRepoName', 'somePath', {
      someAcceptedResult: true,
    }));
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('someUrl/somePath', {
      headers: {
        Authorization: 'Bearer someAccessToken',
      },
    });
  });

  it('fetchesRepoData with no path', async () => {
    const nextMock = jest.fn();
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
    })(nextMock)(FETCH_REPODETAILDATA('someRepoName', undefined));

    expect(nextMock).toHaveBeenCalledTimes(2);
    expect(nextMock).toHaveBeenNthCalledWith(1, FETCH_REPODETAILDATA('someRepoName', undefined));
    expect(nextMock).toHaveBeenNthCalledWith(2, FETCHED_REPODETAILDATA('someRepoName', undefined, {
      someAcceptedResult: true,
    }));
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('someUrl', {
      headers: {
        Authorization: 'Bearer someAccessToken',
      },
    });
  });

  it('skips', async () => {
    const mockAction = { type: 'someThingDifferent' };
    const nextMock = jest.fn();
    await customMiddleWare({
      getState: () => { },
    })(nextMock)(mockAction);

    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(nextMock).toHaveBeenNthCalledWith(1, mockAction);
    expect(global.fetch).toHaveBeenCalledTimes(0);
  });
});
