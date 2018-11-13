import React from 'react';
import { mount } from 'enzyme';
import FormRendeer from '../form-renderer';

describe('Form renderer settings', () => {
  let initialProps;
  beforeEach(() => {
    initialProps = {
      onSubmit: jest.fn(),
    };
  });

  it('Should set pf3 component context if no prop is passed', () => {
    const wrapper = mount(<FormRendeer {...initialProps} />);
    expect(wrapper.props().formType).toEqual('pf3');
  });
});
