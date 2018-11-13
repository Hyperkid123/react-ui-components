import React from 'react';
import PropTypes from 'prop-types';
import ComponentMapper from './componentMapper';
import { dataTypeValidator } from './validators/validators';
import validatorMapper from './validators/validator-mapper';

const renderSingleField = ({ component, ...rest }, formOptions) =>
  <ComponentMapper key={rest.name} component={component} formOptions={formOptions} componentProps={rest} />;

renderSingleField.propTypes = {
  component: PropTypes.string.isRequired,
};

const prepareFieldProps = field => ({
  ...field,
  dataType: undefined,
  validate: field.validate
    ? [...field.validate.map(({ type, options = {} }) => (Object.keys(options).length === 0
      ? validatorMapper(type)
      : validatorMapper(type)(options))),
    field.dataType && dataTypeValidator(field.dataType)(),
    ]
    : [],
});

const renderForm = (fields, formOptions) => fields.map(field => (Array.isArray(field)
  ? renderForm(field, formOptions)
  : renderSingleField(prepareFieldProps(field), { renderForm, ...formOptions })));

export default renderForm;
