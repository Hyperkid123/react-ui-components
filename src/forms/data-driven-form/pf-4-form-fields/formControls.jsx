import React from 'react';
import { Button, ActionGroup, ToolbarGroup, ToolbarItem } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import { __ } from '../../../global-functions';

const FormControls = ({
  onSubmit,
  onCancel,
  onReset,
  submitLabel,
  cancelLabel,
  resetLabel,
}) => (
  <ActionGroup bsClass="pull-right">
    <ToolbarGroup>
      <ToolbarItem>
        <Button bsStyle="primary" type="button" onClick={onSubmit}>{submitLabel}</Button>
        {onReset && <Button type="button" onClick={onReset}>{resetLabel}</Button>}
        {onCancel && <Button type="button" onClick={onCancel}>{cancelLabel}</Button>}
      </ToolbarItem>
    </ToolbarGroup>
  </ActionGroup>
);

FormControls.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onReset: PropTypes.func,
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  resetLabel: PropTypes.string,
};

FormControls.defaultProps = {
  submitLabel: __('Submit'),
  cancelLabel: __('Cancel'),
  resetLabel: __('Reset'),
};

export default FormControls;
