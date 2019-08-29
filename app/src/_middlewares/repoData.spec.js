import { FETCH_REPODATA, FETCHED_REPODATA } from '../_actions/REPODATA';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({
    someAcceptedResult: true,
  }),
}));

const repoData = require('./repoData');

const customMiddleWare = repoData.default;

describe('repoDataLoader', () => {
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
      }),
    })(nextMock)(FETCH_REPODATA('someUrl'));

    expect(nextMock).toHaveBeenCalledTimes(2);
    expect(nextMock).toHaveBeenNthCalledWith(1, FETCH_REPODATA('someUrl'));
    expect(nextMock).toHaveBeenNthCalledWith(2, FETCHED_REPODATA({
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
