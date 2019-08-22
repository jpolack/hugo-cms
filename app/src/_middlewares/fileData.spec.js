import { FETCH_FILEDATA } from '../_actions/FILEDATA';

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
    let ran = false;
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
    })((action) => {
      expect(action.type).toEqual('FETCHED_FILEDATA');
      expect(action.fileData).toEqual({
        someAcceptedResult: true,
      });
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('someUrl', {
        headers: {
          Authorization: 'Bearer someAccessToken',
        },
      });
      ran = true;
    })(FETCH_FILEDATA('somePath'));

    expect(ran).toBe(true);
  });

  it('not fetchesfileData if no file found', async () => {
    let ran = false;
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
    })((action) => {
      expect(action.type).toEqual('FETCH_FILEDATA');
      expect(action.filePath).toEqual('somePath');
      expect(global.fetch).toHaveBeenCalledTimes(0);
      ran = true;
    })(FETCH_FILEDATA('somePath'));

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
