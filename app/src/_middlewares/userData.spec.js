import { FETCH_USERDATA, FETCHED_USERDATA } from '../_actions/USERDATA';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({
    someAcceptedResult: true,
  }),
}));

const userData = require('./userData');

describe('UserDataLoader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetchesUserData', async () => {
    const customMiddleWare = userData.default;

    const nextMock = jest.fn();
    await customMiddleWare({
      getState: () => ({
        authenticationState: {
          accessToken: 'someAccessToken',
        },
      }),
    })(nextMock)(FETCH_USERDATA());

    expect(nextMock).toHaveBeenCalledTimes(2);
    expect(nextMock).toHaveBeenNthCalledWith(1, FETCH_USERDATA());
    expect(nextMock).toHaveBeenNthCalledWith(2, FETCHED_USERDATA({
      someAcceptedResult: true,
    }));
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://api.github.com/user', {
      headers: {
        Authorization: 'Bearer someAccessToken',
      },
    });
  });

  it('skips', async () => {
    const customMiddleWare = userData.default;

    const mockAction = { type: 'someThingDifferent' };
    const nextMock = jest.fn();
    await customMiddleWare({
      getState: () => {},
    })(nextMock)(mockAction);

    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(nextMock).toHaveBeenNthCalledWith(1, mockAction);
    expect(global.fetch).toHaveBeenCalledTimes(0);
  });
});
