import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import { Redirect } from 'react-router-dom';

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((init) => [init, setState]);

const { Repo, renderIcon } = require('./index');

describe('Repo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('headline', () => {
    it('Shows correct', () => {
      const props = {
        history: {
          push: jest.fn(),
          replace: jest.fn(),
        },
        dispatch: jest.fn(),
        match: {
          params: {
            name: 'someName',
            path: 'somePath',
          },
        },
        loadState: {
          repoDetailData: {
            files: [],
          },
        },
      };
      const renderedApp = shallow(
        <Repo {...props} />, // eslint-disable-line react/jsx-props-no-spreading
      );

      const headline = renderedApp.find(Typography);
      expect(headline.length).toBe(1);
      expect(headline.text()).toEqual('Files in someName');
    });

    it('Redirects if name is not present', () => {
      const props = {
        history: {
          push: jest.fn(),
          replace: jest.fn(),
        },
        dispatch: jest.fn(),
        match: {
          params: {
            name: undefined,
            path: 'somePath',
          },
        },
        loadState: {
          repoDetailData: {
            files: [],
          },
        },
      };
      const renderedApp = shallow(
        <Repo {...props} />, // eslint-disable-line react/jsx-props-no-spreading
      );

      expect(renderedApp.is(Redirect)).toBe(true);
    });
  });

  describe('navigation', () => {
    it('navigates back correctly', () => {
      const props = {
        history: {
          push: jest.fn(),
          replace: jest.fn(),
        },
        dispatch: jest.fn(),
        match: {
          params: {
            name: 'someName',
            path: 'somePath',
          },
        },
        loadState: {
          repoDetailData: {
            files: [],
          },
        },
      };
      const renderedApp = shallow(
        <Repo {...props} />, // eslint-disable-line react/jsx-props-no-spreading
      );

      expect(renderedApp.find(IconButton).length).toBe(2);

      renderedApp.find(IconButton).at(0).simulate('click');
      expect(props.history.replace).toHaveBeenCalledTimes(1);
    });

    it('navigates create correctly', () => {
      const props = {
        history: {
          push: jest.fn(),
          replace: jest.fn(),
        },
        dispatch: jest.fn(),
        match: {
          params: {
            name: 'someName',
            path: 'somePath',
          },
        },
        loadState: {
          repoDetailData: {
            files: [],
          },
        },
      };
      const renderedApp = shallow(
        <Repo {...props} />, // eslint-disable-line react/jsx-props-no-spreading
      );

      expect(renderedApp.find(IconButton).length).toBe(2);

      renderedApp.find(IconButton).at(1).simulate('click');
      expect(setState).toHaveBeenCalledTimes(1);
    });
  });

  describe('display data', () => {
    it('displays correctly', () => {
      const props = {
        history: {
          push: jest.fn(),
          replace: jest.fn(),
        },
        dispatch: jest.fn(),
        match: {
          params: {
            name: 'someName',
            path: 'somePath',
          },
        },
        loadState: {
          repoDetailData: {
            files: [{
              type: 'file',
              path: 'README.md',
              name: 'README.md',
            }, {
              type: 'dir',
              path: 'content',
              name: 'content',
            }, {
              type: 'file',
              path: 'content/abc.md',
              name: 'abc.md',
            }],
          },
        },
      };
      const renderedApp = shallow(
        <Repo {...props} />, // eslint-disable-line react/jsx-props-no-spreading
      );

      expect(renderedApp.find(ListItem).length).toBe(3);
    });

    it('filters correctly', () => {
      const props = {
        history: {
          push: jest.fn(),
          replace: jest.fn(),
        },
        dispatch: jest.fn(),
        match: {
          params: {
            name: 'someName',
            path: 'somePath',
          },
        },
        loadState: {
          repoDetailData: {
            files: [{
              type: 'file',
              path: 'notREADME.md',
              name: 'notREADME.md',
            }, {
              type: 'dir',
              path: 'notcontent',
              name: 'notcontent',
            }, {
              type: 'file',
              path: 'notcontent/abc.md',
              name: 'abc.md',
            }],
          },
        },
      };
      const renderedApp = shallow(
        <Repo {...props} />, // eslint-disable-line react/jsx-props-no-spreading
      );

      expect(renderedApp.find(ListItem).length).toBe(0);
    });

    it('handles file click correctly', () => {
      const props = {
        history: {
          push: jest.fn(),
          replace: jest.fn(),
        },
        dispatch: jest.fn(),
        match: {
          params: {
            name: 'someName',
            path: 'somePath',
          },
        },
        loadState: {
          repoDetailData: {
            files: [{
              type: 'file',
              path: 'README.md',
              name: 'README.md',
            }],
          },
        },
      };
      const renderedApp = shallow(
        <Repo {...props} />, // eslint-disable-line react/jsx-props-no-spreading
      );

      expect(renderedApp.find(ListItem).length).toBe(1);
      renderedApp.find(ListItem).simulate('click');
      expect(props.history.push).toBeCalledTimes(1);
      expect(props.history.push).toBeCalledWith('/file/someName/README.md/edit');
    });

    it('handles dir click correctly', () => {
      const props = {
        history: {
          push: jest.fn(),
          replace: jest.fn(),
        },
        dispatch: jest.fn(),
        match: {
          params: {
            name: 'someName',
            path: 'somePath',
          },
        },
        loadState: {
          repoDetailData: {
            files: [{
              type: 'dir',
              path: 'content',
              name: 'content',
            }],
          },
        },
      };
      const renderedApp = shallow(
        <Repo {...props} />, // eslint-disable-line react/jsx-props-no-spreading
      );

      expect(renderedApp.find(ListItem).length).toBe(1);
      renderedApp.find(ListItem).simulate('click');
      expect(props.history.push).toBeCalledTimes(1);
      expect(props.history.push).toBeCalledWith('/repo/someName/content');
    });
  });
});

describe('renderIcon', () => {
  it('renders file correctly', () => {
    const icon = shallow(renderIcon('file'));

    expect(icon.text()).toEqual('create');
  });
  it('renders dir correctly', () => {
    const icon = shallow(renderIcon('dir'));

    expect(icon.text()).toEqual('folder');
  });
  it('renders error correctly', () => {
    const icon = shallow(renderIcon(''));

    expect(icon.text()).toEqual('report');
  });
});
