import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { Form as Pf3Form } from 'patternfly-react';
import { Form as Pf4Form } from '@patternfly/react-core';
import arrayMutators from 'final-form-arrays';
import ComponentType from './renderer-context';
import Pf3FormControls from './pf-3-form-fields/formControls';
import Pf4FormControls from './pf-4-form-fields/formControls';

import renderForm from './render-form';

const formWrapperMapper = componentType => ({
  pf3: ({ children, ...props }) => <Pf3Form {...props} horizontal>{children}</Pf3Form>,
  pf4: ({ children, ...props }) => <Pf4Form {...props}>{children}</Pf4Form>,
})[componentType];

const formControlsMapper = componentType => ({
  pf3: props => <Pf3FormControls {...props} />,
  pf4: props => <Pf4FormControls {...props} />,
})[componentType];

const FormRenderer = ({
  formType,
  onSubmit,
  onCancel,
  canReset,
  schema,
}) => (
  <ComponentType.Provider value={formType}>
    <Form
      onSubmit={onSubmit}
      mutators={{ ...arrayMutators }}
      subscription={{ prisitne: true, submitting: true }}
      render={({ handleSubmit, pristine, form: { reset, mutators, change } }) => (
        formWrapperMapper(formType)({
          children: (
            <Fragment>
              <div>Form renderer of type: {formType}</div>
              {renderForm(schema.fields, { push: mutators.push, change, pristine })}
              {formControlsMapper(formType)({ onSubmit: handleSubmit, onCancel, onReset: canReset && reset })}
            </Fragment>
        ),
      })
      )}
    />
  </ComponentType.Provider>
);

FormRenderer.propTypes = {
  formType: PropTypes.oneOf(['pf3', 'pf4']),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  canReset: PropTypes.bool,
  schema: PropTypes.object.isRequired,
};

FormRenderer.defaultProps = {
  formType: 'pf3',
  resetAble: false,
};

export default FormRenderer;
