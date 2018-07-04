import React from 'react';
import { Col, Button } from 'patternfly-react';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { FinalFormField, FinalFormSelect, Condition, FieldGroup, FinalFormRadio, FinalFormCheckBox } from '../forms';
// eslint-disable-next-line
import { TEXT_FIELD, SELECT_FIELD, BUTTON, FIELD_GROUP } from './formsComponents';

const fieldChange = (updateWizard, onChange, manipulateSteps) => (updateWizard ? (value) => {
  onChange(value);
  manipulateSteps(value);
} : value => onChange(value));

const renderFieldWrapper = ({
  FormField,
  name,
  validate,
  manipulateSteps,
  condition,
  ...rest
}) => {
  const component = (
    <Col xs={12} key={`form-field-${name}`}>
      <Field
        name={name}
        validate={validate}
        render={({ input, meta }) => (
          <FormField
            input={{
              ...input,
              onChange: fieldChange(rest.updateWizard, input.onChange, manipulateSteps),
            }}
            meta={meta}
            {...rest}
          />
        )}
      />
    </Col>
  );
  if (condition) {
    return (
      <Condition key={`form-field-${name}`} when={condition.when} is={condition.is}>
        {component}
      </Condition>
    );
  }
  return component;
};

const renderButton = ({ label, onClick, ...rest }) => (
  <Col xsOffset={2} xs={10} key={rest.key}>
    <Button onClick={onClick}>{label}</Button>
  </Col>
);

const renderFieldGroup = ({
  name,
  label,
  fields,
}) => (
  <FieldGroup name={name} label={label} key={`field-group-${name}`}>
    {fields.map(({ type, ...field }) => (
      <Field
        key={field.id}
        name={name}
        id={field.id}
        component={type === 'radio' ? FinalFormRadio : FinalFormCheckBox}
        type="type"
        {...field}
      />
    ))}
  </FieldGroup>
);

renderFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  fields: PropTypes.array,
};

renderFieldGroup.defaultProps = {
  label: 'default',
};

renderButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

renderFieldWrapper.propTypes = {
  FormField: PropTypes.any,
  name: PropTypes.string,
  validate: PropTypes.func,
  manipulateSteps: PropTypes.func,
  condition: PropTypes.object,
};

const selectFieldType = ({ fieldType, ...rest }, manipulateSteps) => ({
  [TEXT_FIELD]: () => renderFieldWrapper({ FormField: FinalFormField, ...rest }),
  [SELECT_FIELD]: () => renderFieldWrapper({ FormField: FinalFormSelect, manipulateSteps, ...rest }),
  [FIELD_GROUP]: () => renderFieldGroup({ ...rest }),
  [BUTTON]: () => renderButton({ ...rest }),
})[fieldType];


export const renderWizardBody = (components, manipulateSteps) => components.map(definition => selectFieldType(definition, manipulateSteps)());
