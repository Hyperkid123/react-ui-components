import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'react-final-form-arrays';
import { Col, ButtonGroup, Button } from 'patternfly-react';
import { CloseIcon, PlusIcon } from '@patternfly/react-icons';
import { Field } from 'react-final-form';
import { composeValidators } from '../helpers';


const ArrayItem = ({
  renderForm,
  fields,
  fieldKey,
  fieldIndex,
  name,
  remove,
}) => (
  <React.Fragment>
    <Col xs={12}>
      { renderForm(fields.map((field) => {
                  const itemName = field.name
                      ? field.name.substring(field.name.lastIndexOf('.') + 1)
                      : `${fieldKey}[${fieldIndex}]`;
                  const fieldName = `${name}${itemName && itemName !== 'items' ? itemName : ''}`;
                  return { ...field, name: fieldName, key: name };
              })) }
    </Col>
    <ButtonGroup span={1}>
      <Button type="button" variant="danger" onClick={() => remove(fieldIndex)}><CloseIcon /></Button>
    </ButtonGroup>

  </React.Fragment>
);

ArrayItem.propTypes = {
  renderForm: PropTypes.func.isRequired,
  fieldKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fieldIndex: PropTypes.number.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object),
  remove: PropTypes.func.isRequired,
};

const DynamicArray = ({
  fieldKey,
  validate,
  title,
  description,
  renderForm,
  fields,
  itemDefault,
}) => (
  <FieldArray key={fieldKey} validate={validate} name={fieldKey}>
    { ({ fields: { map, remove, push }, meta: { error, dirty } }) => (
      <Fragment>
        { title && <h3>{ title }</h3> }
        { description && <p>{ description }</p> }
        { map((name, index) => (
          <ArrayItem
            key={`${name}-${index}`}
            fields={fields}
            name={name}
            fieldKey={fieldKey}
            fieldIndex={index}
            renderForm={renderForm}
            remove={remove}
          />)) }
        { dirty && error && typeof error === 'string' && <p>{ error }</p> }
        <ButtonGroup>
          <Button type="button" variant="link" onClick={() => push(itemDefault)}>
            <PlusIcon /> Add { title }
          </Button>
        </ButtonGroup>
      </Fragment>
      ) }
  </FieldArray>
);
