import { FETCH_FILEDATA, FETCHED_FILEDATA } from '../_actions/FILEDATA';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({
    someAcceptedResult: true,
  }),
}));

const fileData = require('./fileData');

const customMiddleWare = fileData.default;

describe('fileDataLoader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetchesfileData', async () => {
    const nextMock = jest.fn();
    await customMiddleWare({
      getState: () => ({
        authenticationState: {
          accessToken: 'someAccessToken',
        },
        loadState: {
          repoDetailData: {
            files: [{
              path: 'somePath',
              url: 'someUrl',
            }],
          },
        },
      }),
    })(nextMock)(FETCH_FILEDATA('somePath'));

    expect(nextMock).toHaveBeenCalledTimes(2);
    expect(nextMock).toHaveBeenNthCalledWith(1, FETCH_FILEDATA('somePath'));
    expect(nextMock).toHaveBeenNthCalledWith(2, FETCHED_FILEDATA({
      someAcceptedResult: true,
    }));
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('someUrl', {
      headers: {
        Authorization: 'Bearer someAccessToken',
      },
    });
  });

  it('not fetchesfileData if no file found', async () => {
    const nextMock = jest.fn();
    await customMiddleWare({
      getState: () => ({
        authenticationState: {
          accessToken: 'someAccessToken',
        },
        loadState: {
          repoDetailData: {
            files: [],
          },
        },
      }),
    })(nextMock)(FETCH_FILEDATA('somePath'));

    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(nextMock).toHaveBeenNthCalledWith(1, FETCH_FILEDATA('somePath'));
    expect(global.fetch).toHaveBeenCalledTimes(0);
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
