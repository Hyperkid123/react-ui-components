import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const SubForm = ({
  renderForm,
  fields,
  title,
  description,
}) => (
  <Fragment>
    { title && <h3>{ title }</h3> }
    { description && <p>{ description }</p> }
    { renderForm(fields) }
  </Fragment>
);

SubForm.propTypes = {
  renderForm: PropTypes.func.isRequired,
  fields: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default SubForm;
