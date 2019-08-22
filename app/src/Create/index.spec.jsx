import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import { PUSH_FILECREATE } from '../_actions/FILECREATE';

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((init) => [init, setState]);

const { CreateDialog } = require('./index');

describe('CreateDialog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the dialog', () => {
    const props = {
      open: true,
      setOpen: jest.fn(),
      dispatch: jest.fn(),
    };
    const renderedApp = shallow(
      <CreateDialog {...props} />, // eslint-disable-line react/jsx-props-no-spreading
    );

    const btn = renderedApp.find(Button);
    expect(btn.length).toBe(2);
  });

  it('closes the dialog on cancel', () => {
    const props = {
      open: true,
      setOpen: jest.fn(),
      dispatch: jest.fn(),
    };
    const renderedApp = shallow(
      <CreateDialog {...props} />, // eslint-disable-line react/jsx-props-no-spreading
    );

    const btn = renderedApp.find(Button);
    expect(btn.length).toBe(2);

    btn.at(0).simulate('click');

    expect(props.setOpen).toHaveBeenCalledTimes(1);
    expect(props.setOpen).toHaveBeenCalledWith(false);
  });

  it('dispatches an action submit', () => {
    useStateSpy.mockImplementation(() => ['somePath', setState]);

    const props = {
      open: true,
      setOpen: jest.fn(),
      dispatch: jest.fn(),
    };
    const renderedApp = shallow(
      <CreateDialog {...props} />, // eslint-disable-line react/jsx-props-no-spreading
    );

    const btn = renderedApp.find(Button);
    expect(btn.length).toBe(2);

    btn.at(1).simulate('click');

    expect(props.dispatch).toHaveBeenCalledTimes(1);
    expect(props.dispatch).toHaveBeenCalledWith(PUSH_FILECREATE('somePath'));
  });
});
