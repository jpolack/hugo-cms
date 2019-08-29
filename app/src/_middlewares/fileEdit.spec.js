import base64 from 'base-64';
import { PUSH_FILEEDIT, PUSHED_FILEEDIT } from '../_actions/FILEEDIT';

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
    const nextMock = jest.fn();
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
    })(nextMock)(PUSH_FILEEDIT('someFileContent', {
      title: 'someTitle',
      draft: 'someDraft',
      date: 'someDate',
      weight: 'someWeight',
      tags: 'someTags',
    }));

    expect(nextMock).toHaveBeenCalledTimes(2);
    expect(nextMock).toHaveBeenNthCalledWith(1, PUSH_FILEEDIT('someFileContent', {
      title: 'someTitle',
      draft: 'someDraft',
      date: 'someDate',
      weight: 'someWeight',
      tags: 'someTags',
    }));
    expect(nextMock).toHaveBeenNthCalledWith(2, PUSHED_FILEEDIT());
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
