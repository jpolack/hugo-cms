import { PUSH_FILECREATE } from '../_actions/FILECREATE';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({
    someAcceptedResult: true,
  }),
}));

const fileCreate = require('./fileCreate');

const customMiddleWare = fileCreate.default;

describe('fileCreateLoader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetchesfileCreate', async () => {
    let ran = false;
    await customMiddleWare({
      getState: () => ({
        authenticationState: {
          accessToken: 'someAccessToken',
        },
        loadState: {
          userData: {
            login: 'someUserName',
          },
          repoDetailData: {
            name: 'someRepoName',
            path: 'somePath',
          },
        },
      }),
    })((action) => {
      expect(action.type).toEqual('PUSHED_FILECREATE');
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('https://api.github.com/repos/someUserName/someRepoName/contents/somePath/someCreatePath', {
        headers: {
          Authorization: 'Bearer someAccessToken',
        },
        method: 'PUT',
        body: JSON.stringify({
          message: 'creating somePath/someCreatePath',
          content: '',
        }),
      });
      ran = true;
    })(PUSH_FILECREATE('someCreatePath'));

    expect(ran).toBe(true);
  });

  it('fetchesfileCreate with empty path', async () => {
    let ran = false;
    await customMiddleWare({
      getState: () => ({
        authenticationState: {
          accessToken: 'someAccessToken',
        },
        loadState: {
          userData: {
            login: 'someUserName',
          },
          repoDetailData: {
            name: 'someRepoName',
            path: undefined,
          },
        },
      }),
    })((action) => {
      expect(action.type).toEqual('PUSHED_FILECREATE');
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('https://api.github.com/repos/someUserName/someRepoName/contents/someCreatePath', {
        headers: {
          Authorization: 'Bearer someAccessToken',
        },
        method: 'PUT',
        body: JSON.stringify({
          message: 'creating someCreatePath',
          content: '',
        }),
      });
      ran = true;
    })(PUSH_FILECREATE('someCreatePath'));

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
