import base64 from 'base-64';
import { PUSH_FILEEDIT } from '../_actions/FILEEDIT';

jest.mock('base-64');
base64.encode.mockImplementation((s) => s);

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({
    someAcceptedResult: true,
  }),
}));

const fileEdit = require('./fileEdit');

const customMiddleWare = fileEdit.default;

describe('fileEditLoader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetchesfileEdit', async () => {
    let ran = false;
    await customMiddleWare({
      getState: () => ({
        authenticationState: {
          accessToken: 'someAccessToken',
        },
        loadState: {
          fileData: {
            url: 'someUrl',
            sha: 'someSHA',
            path: 'somePath',
          },
        },
      }),
    })((action) => {
      expect(action.type).toEqual('PUSHED_FILEEDIT');
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('someUrl', {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer someAccessToken',
        },
        body: JSON.stringify({
          message: 'Updating somePath',
          content: '---\ntitle: "someTitle"\ndate: someDate\ndraft: someDraft\nweight: someWeight\ntags: someTags\n---\n\nsomeFileContent',
          sha: 'someSHA',
        }),
      });
      ran = true;
    })(PUSH_FILEEDIT('someFileContent', {
      title: 'someTitle',
      draft: 'someDraft',
      date: 'someDate',
      weight: 'someWeight',
      tags: 'someTags',
    }));

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
