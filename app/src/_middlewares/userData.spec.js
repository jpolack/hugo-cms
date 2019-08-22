import { FETCH_USERDATA } from '../_actions/USERDATA';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({
    someAcceptedResult: true,
  }),
}));

const userData = require('./userData');

describe('UserDataLoader', () => {
  it('fetchesUserData', async () => {
    const customMiddleWare = userData.default;

    let ran = false;
    await customMiddleWare({
      getState: () => ({
        authenticationState: {
          accessToken: 'someAccessToken',
        },
      }),
    })((action) => {
      expect(action.type).toEqual('FETCHED_USERDATA');
      expect(action.userData).toEqual({
        someAcceptedResult: true,
      });
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith('https://api.github.com/user', {
        headers: {
          Authorization: 'Bearer someAccessToken',
        },
      });
      ran = true;
    })(FETCH_USERDATA());

    expect(ran).toBe(true);
  });

  it('skips', async () => {
    const customMiddleWare = userData.default;

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
