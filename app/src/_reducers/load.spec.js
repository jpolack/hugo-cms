import loadReducer from './load';
import { FETCH_USERDATA, FETCHED_USERDATA } from '../_actions/USERDATA';
import { FETCH_FILEDATA, FETCHED_FILEDATA } from '../_actions/FILEDATA';
import { FETCH_REPODATA, FETCHED_REPODATA } from '../_actions/REPODATA';
import { FETCH_REPODETAILDATA, FETCHED_REPODETAILDATA } from '../_actions/REPODETAILDATA';

describe('loadReducer', () => {
  it('changes state for userData', () => {
    const newState = loadReducer({
      userData: {
        meta: {
          loading: false,
        },
      },
      repoData: {
        meta: {
          loading: false,
        },
        repositories: [],
      },
      repoDetailData: {
        meta: {
          loading: false,
        },
        name: undefined,
        path: undefined,
        files: [],
      },
      fileData: {
        meta: {
          loading: false,
        },
      },
    }, FETCH_USERDATA());

    expect(newState).toEqual({
      userData: {
        meta: {
          loading: true,
        },
      },
      repoData: {
        meta: {
          loading: false,
        },
        repositories: [],
      },
      repoDetailData: {
        meta: {
          loading: false,
        },
        name: undefined,
        path: undefined,
        files: [],
      },
      fileData: {
        meta: {
          loading: false,
        },
      },
    });

    const finalState = loadReducer(newState, FETCHED_USERDATA({ someData: true }));

    expect(finalState).toEqual({
      userData: {
        meta: {
          loading: false,
          lastUpdate: expect.any(Number),
        },
        someData: true,
      },
      repoData: {
        meta: {
          loading: false,
        },
        repositories: [],
      },
      repoDetailData: {
        meta: {
          loading: false,
        },
        name: undefined,
        path: undefined,
        files: [],
      },
      fileData: {
        meta: {
          loading: false,
        },
      },
    });
  });

  it('changes state for fileData', () => {
    const newState = loadReducer({
      userData: {
        meta: {
          loading: false,
        },
      },
      repoData: {
        meta: {
          loading: false,
        },
        repositories: [],
      },
      repoDetailData: {
        meta: {
          loading: false,
        },
        name: undefined,
        path: undefined,
        files: [],
      },
      fileData: {
        meta: {
          loading: false,
        },
      },
    }, FETCH_FILEDATA('somePath'));

    expect(newState).toEqual({
      userData: {
        meta: {
          loading: false,
        },
      },
      repoData: {
        meta: {
          loading: false,
        },
        repositories: [],
      },
      repoDetailData: {
        meta: {
          loading: false,
        },
        name: undefined,
        path: undefined,
        files: [],
      },
      fileData: {
        meta: {
          loading: true,
        },
      },
    });

    const finalState = loadReducer(newState, FETCHED_FILEDATA({ someData: true }));

    expect(finalState).toEqual({
      userData: {
        meta: {
          loading: false,
        },
      },
      repoData: {
        meta: {
          loading: false,
        },
        repositories: [],
      },
      repoDetailData: {
        meta: {
          loading: false,
        },
        name: undefined,
        path: undefined,
        files: [],
      },
      fileData: {
        meta: {
          loading: false,
          lastUpdate: expect.any(Number),
        },
        someData: true,
      },
    });
  });

  it('changes state for repoData', () => {
    const newState = loadReducer({
      userData: {
        meta: {
          loading: false,
        },
      },
      repoData: {
        meta: {
          loading: false,
        },
        repositories: [],
      },
      repoDetailData: {
        meta: {
          loading: false,
        },
        name: undefined,
        path: undefined,
        files: [],
      },
      fileData: {
        meta: {
          loading: false,
        },
      },
    }, FETCH_REPODATA('someUrl'));

    expect(newState).toEqual({
      userData: {
        meta: {
          loading: false,
        },
      },
      repoData: {
        meta: {
          loading: true,
        },
        repositories: [],
      },
      repoDetailData: {
        meta: {
          loading: false,
        },
        name: undefined,
        path: undefined,
        files: [],
      },
      fileData: {
        meta: {
          loading: false,
        },
      },
    });

    const finalState = loadReducer(newState, FETCHED_REPODATA([{ someData: true }]));

    expect(finalState).toEqual({
      userData: {
        meta: {
          loading: false,
        },
      },
      repoData: {
        meta: {
          loading: false,
          lastUpdate: expect.any(Number),
        },
        repositories: [{ someData: true }],
      },
      repoDetailData: {
        meta: {
          loading: false,
        },
        name: undefined,
        path: undefined,
        files: [],
      },
      fileData: {
        meta: {
          loading: false,
        },
      },
    });
  });

  it('changes state for repoDetailData', () => {
    const newState = loadReducer({
      userData: {
        meta: {
          loading: false,
        },
      },
      repoData: {
        meta: {
          loading: false,
        },
        repositories: [],
      },
      repoDetailData: {
        meta: {
          loading: false,
        },
        name: undefined,
        path: undefined,
        files: [],
      },
      fileData: {
        meta: {
          loading: false,
        },
      },
    }, FETCH_REPODETAILDATA('name', 'path'));

    expect(newState).toEqual({
      userData: {
        meta: {
          loading: false,
        },
      },
      repoData: {
        meta: {
          loading: false,
        },
        repositories: [],
      },
      repoDetailData: {
        meta: {
          loading: true,
        },
        name: undefined,
        path: undefined,
        files: [],
      },
      fileData: {
        meta: {
          loading: false,
        },
      },
    });

    const finalState = loadReducer(newState, FETCHED_REPODETAILDATA('name', 'path', [{ someData: true }]));

    expect(finalState).toEqual({
      userData: {
        meta: {
          loading: false,
        },
      },
      repoData: {
        meta: {
          loading: false,
        },
        repositories: [],
      },
      repoDetailData: {
        meta: {
          loading: false,
          lastUpdate: expect.any(Number),
        },
        name: 'name',
        path: 'path',
        files: [{ someData: true }],
      },
      fileData: {
        meta: {
          loading: false,
        },
      },
    });
  });
});
