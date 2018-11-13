import React from 'react';
import { components } from '../constants';
import { TextField, TextareaField, CheckboxGroup, RadioGroup, SelectField, SubForm } from './form-fields';

const renderArrayField = props => <div key={props.key || props.name}>There will be array field</div>; // eslint-disable-line

const componentMapper = (componentType, formOptions) => ({
  [components.TEXT_FIELD]: props => <TextField {...props} key={props.name} />,
  [components.TEXTAREA_FIELD]: props => <TextareaField {...props} key={props.name} />,
  [components.SELECT_COMPONENT]: props => <SelectField {...props} key={props.name} />,
  [components.CHECKBOX]: props => <CheckboxGroup {...props} key={props.name} />,
  [components.RADIO]: props => <RadioGroup {...props} key={props.name} />,
  [components.FIELD_ARRAY]: props => renderArrayField(props, formOptions),
  [components.FIXED_LIST]: props => renderArrayField(props, { ...formOptions, hasFixedItems: true }),
  [components.SUB_FORM]: props =>
    <SubForm key={props.key} fieldKey={props.key} {...props} renderForm={formOptions.renderForm} />,
})[componentType];

export default componentMapper;
