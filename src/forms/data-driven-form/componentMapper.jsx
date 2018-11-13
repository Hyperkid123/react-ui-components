import React from 'react';
import PropTypes from 'prop-types';
import ComponentType from './renderer-context';
import pf3ComponentMapper from './pf-3-form-fields/component-mapper';

const chooseFormMapper = formType => ({
  pf3: pf3ComponentMapper,
})[formType];

const ComponentMapper = ({ component, formOptions, componentProps }) => (
  <ComponentType.Consumer key={componentProps.name}>
    {formType => chooseFormMapper(formType)(component, formOptions)(componentProps)}
  </ComponentType.Consumer>
);

ComponentMapper.propTypes = {
  component: PropTypes.string.isRequired,
  formOptions: PropTypes.object.isRequired,
  componentProps: PropTypes.object.isRequired,
};

export default ComponentMapper;
