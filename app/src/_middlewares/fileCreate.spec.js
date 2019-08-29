import moment from 'moment';
import base64 from 'base-64';
import { PUSH_FILECREATE, PUSHED_FILECREATE } from '../_actions/FILECREATE';

jest.mock('moment');
jest.mock('base-64');

const mockFormat = jest.fn(() => 'formatedDate');
moment.mockImplementation(() => ({
  format: mockFormat,
}));
base64.encode.mockImplementation((s) => s);

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
    const nextMock = jest.fn();
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
    })(nextMock)(PUSH_FILECREATE('someCreatePath'));

    expect(nextMock).toHaveBeenCalledTimes(2);
    expect(nextMock).toHaveBeenNthCalledWith(1, PUSH_FILECREATE('someCreatePath'));
    expect(nextMock).toHaveBeenNthCalledWith(2, PUSHED_FILECREATE());
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
  });

  it('fetchesfileCreate with empty path', async () => {
    const nextMock = jest.fn();
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
    })(nextMock)(PUSH_FILECREATE('someCreatePath'));

    expect(nextMock).toHaveBeenCalledTimes(2);
    expect(nextMock).toHaveBeenNthCalledWith(1, PUSH_FILECREATE('someCreatePath'));
    expect(nextMock).toHaveBeenNthCalledWith(2, PUSHED_FILECREATE());
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
  });

  it('fetchesfileCreate with metadata', async () => {
    const nextMock = jest.fn();
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
    })(nextMock)(PUSH_FILECREATE('someCreatePath', true));

    expect(nextMock).toHaveBeenCalledTimes(2);
    expect(nextMock).toHaveBeenNthCalledWith(1, PUSH_FILECREATE('someCreatePath', true));
    expect(nextMock).toHaveBeenNthCalledWith(2, PUSHED_FILECREATE());
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://api.github.com/repos/someUserName/someRepoName/contents/someCreatePath', {
      headers: {
        Authorization: 'Bearer someAccessToken',
      },
      method: 'PUT',
      body: JSON.stringify({
        message: 'creating someCreatePath',
        content: `---\ntitle: ${JSON.stringify('')}\ndate: formatedDate\ndraft: ${true}\nweight: 0\ntags: []\n---\n\n`,
      }),
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
