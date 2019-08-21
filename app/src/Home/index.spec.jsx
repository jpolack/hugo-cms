import React from 'react';
import { shallow } from 'enzyme';
import ListItem from '@material-ui/core/ListItem';

const { Home } = require('./index');

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('List', () => {
    it('Renders Items', () => {
      const props = {
        history: {
          push: jest.fn(),
        },
        dispatch: jest.fn(),
        loadState: {
          userData: {
            repos_url: 'someUrl',
          },
          repoData: {
            repositories: [{
              name: 'someName',
            }, {
              name: 'someName2',
            }],
          },
        },
      };
      const renderedApp = shallow(
        <Home {...props} />, // eslint-disable-line react/jsx-props-no-spreading
      );

      const listItem = renderedApp.find(ListItem);
      expect(listItem.length).toBe(2);
    });

    it('Renders emptystate correctly', () => {
      const props = {
        history: {
          push: jest.fn(),
        },
        dispatch: jest.fn(),
        loadState: {
          userData: {
            repos_url: 'someUrl',
          },
          repoData: {
            repositories: [],
          },
        },
      };
      const renderedApp = shallow(
        <Home {...props} />, // eslint-disable-line react/jsx-props-no-spreading
      );

      const listItem = renderedApp.find(ListItem);
      expect(listItem.length).toBe(0);
    });

    it('Handles Click correctly', () => {
      const props = {
        history: {
          push: jest.fn(),
        },
        dispatch: jest.fn(),
        loadState: {
          userData: {
            repos_url: 'someUrl',
          },
          repoData: {
            repositories: [{
              name: 'someName',
            }],
          },
        },
      };
      const renderedApp = shallow(
        <Home {...props} />, // eslint-disable-line react/jsx-props-no-spreading
      );

      const listItem = renderedApp.find(ListItem);
      listItem.simulate('click');
      expect(props.history.push).toHaveBeenCalledTimes(1);
      expect(props.history.push).toHaveBeenCalledWith('/repo/someName');
    });
  });
});
