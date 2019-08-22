import { FETCH_REPODATA } from '../_actions/REPODATA';

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
    let ran = false;
    await customMiddleWare({
      getState: () => ({
        authenticationState: {
          accessToken: 'someAccessToken',
        },
      }),
    })((action) => {
      expect(action.type).toEqual('FETCHED_REPODATA');
      expect(action.repoData).toEqual({
        someAcceptedResult: true,
      });
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('someUrl', {
        headers: {
          Authorization: 'Bearer someAccessToken',
        },
      });
      ran = true;
    })(FETCH_REPODATA('someUrl'));

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
