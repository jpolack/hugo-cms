import React from 'react';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import base64 from 'base-64';
import { PUSH_FILEEDIT } from '../_actions/FILEEDIT';

jest.mock('base-64');

base64.decode.mockImplementation((s) => s);
base64.encode.mockImplementation((s) => s);

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((init) => {
  if (!init) {
    return [{
      value: () => 'someValue',
    }, setState];
  }
  return [{
    title: 'someTitle',
    date: 'someDate',
    draft: 'someDraft',
    weight: 'someWeight',
    tags: 'someTags',
  }, setState];
});

const { File, splitMetaAndContent } = require('./index');

describe('File', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Navigates back', () => {
    const props = {
      history: {
        goBack: jest.fn(),
      },
      dispatch: jest.fn(),
      match: {
        params: {
          path: 'somePath',
        },
      },
      loadState: {
        fileData: {
          content: 'someContent',
        },
      },
    };
    const renderedApp = shallow(
      <File {...props} />, // eslint-disable-line react/jsx-props-no-spreading
    );

    const btn = renderedApp.find(IconButton);
    expect(btn.length).toBe(1);
    btn.simulate('click');
    expect(props.history.goBack).toHaveBeenCalledTimes(1);
  });

  it('Submits', () => {
    const props = {
      history: {
        goBack: jest.fn(),
      },
      dispatch: jest.fn(),
      match: {
        params: {
          path: 'somePath',
        },
      },
      loadState: {
        fileData: {
          content: 'someContent',
        },
      },
    };
    const renderedApp = shallow(
      <File {...props} />, // eslint-disable-line react/jsx-props-no-spreading
    );

    const btn = renderedApp.find(Button);
    expect(btn.length).toBe(1);
    btn.simulate('click');
    expect(props.dispatch).toHaveBeenCalledTimes(1);
    expect(props.dispatch).toHaveBeenCalledWith(PUSH_FILEEDIT('someValue', {
      title: 'someTitle',
      date: 'someDate',
      draft: 'someDraft',
      weight: 'someWeight',
      tags: 'someTags',
    }));
  });
});

describe('splitMetaAndContent', () => {
  it('splits correctly', () => {
    const parsedContent = splitMetaAndContent(`
    ---
    title: "SomeTitle"
    date: SomeDate
    draft: SomeDraft
    weight: 100
    tags: [SomeTag, SomeTag2]
    ---

    blablabla
    `);

    expect(parsedContent.meta).toEqual({
      title: 'SomeTitle',
      date: 'SomeDate',
      draft: 'SomeDraft',
      weight: '100',
      tags: '[SomeTag, SomeTag2]',
    });
    expect(parsedContent.content.trim()).toEqual('blablabla');
  });

  it('splits emptyMeta correctly', () => {
    const parsedContent = splitMetaAndContent(`
    blablabla
    `);

    expect(parsedContent.meta).toEqual(undefined);
    expect(parsedContent.content.trim()).toEqual('blablabla');
  });
});
