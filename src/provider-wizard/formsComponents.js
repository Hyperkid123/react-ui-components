import { required } from 'redux-form-validators';

export const TEXT_FIELD = 'FinalFormField';
export const SELECT_FIELD = 'FinalFormSelect';
export const BUTTON = 'Button';
export const FIELD_GROUP = 'FieldGroup';

export const defaultFormComponents = [{
  fieldType: TEXT_FIELD,
  name: 'ems_name',
  label: 'Username',
  validate: required({ msg: 'Username is required' }),
  placeholder: 'Insert name',
}, {
  fieldType: SELECT_FIELD,
  name: 'ems_type',
  label: 'Type',
  validate: required({ msg: 'Provider type is required' }),
  updateWizard: true,
  placeholder: 'Choose one',
  options: [{
    value: 0,
    label: 'Mircosoft',
  }, {
    value: 1,
    label: 'OpenStack',
  }],
}, {
  fieldType: SELECT_FIELD,
  name: 'api',
  label: 'API Version',
  placeholder: 'Choose one',
  options: [{
    value: 0,
    label: 'Keystone v2',
  }, {
    value: 1,
    label: 'Keystone v3',
  }],
  condition: {
    when: 'ems_type',
    is: 1,
  },
}, {
  fieldType: SELECT_FIELD,
  name: 'zone',
  label: 'Zone',
  placeholder: 'Choose one',
  validate: required({ msg: 'Zone is required' }),
  options: [{
    value: 0,
    label: 'Zone 1',
  }, {
    value: 1,
    label: 'Zone 2',
  }],
}];

export const microsoftComponents = [{
  fieldType: SELECT_FIELD,
  name: 'security_protocol',
  label: 'Security Protocol',
  validate: required({ msg: 'Protocol is required' }),
  placeholder: 'Select value',
  options: [{
    value: 0,
    label: 'SSL',
  }, {
    value: 1,
    label: 'Kerberos',
  }],
}, {
  fieldType: TEXT_FIELD,
  name: 'hostname',
  label: 'Username',
  validate: required({ msg: 'Username is required' }),
  placeholder: 'Endpoint username',
}, {
  fieldType: TEXT_FIELD,
  name: 'password',
  label: 'Password',
  validate: required({ msg: 'Password is required' }),
  placeholder: 'Endpoint password',
  type: 'password',
}, {
  key: 'credentials-validate-button',
  fieldType: BUTTON,
  label: 'Validate',
  onClick: () => console.log('Validate clicked'),
}];

export const openStackCredentials = [{
  fieldType: SELECT_FIELD,
  name: 'security_protocol',
  label: 'Security Protocol',
  validate: required({ msg: 'Protocol is required' }),
  placeholder: 'Select value',
  options: [{
    value: 0,
    label: 'SSL',
  }, {
    value: 1,
    label: 'Kerberos',
  }],
}, {
  fieldType: TEXT_FIELD,
  name: 'default_hostname',
  label: 'Hostname (or IPv4 or IPv6 address)',
  validate: required({ msg: 'Required' }),
}, {
  fieldType: TEXT_FIELD,
  name: 'default_api_port',
  label: 'API Port',
  validate: required({ msg: 'Required' }),
  type: 'number',
}, {
  fieldType: TEXT_FIELD,
  name: 'default_username',
  label: 'Username',
  validate: required({ msg: 'Username is required' }),
  placeholder: 'Endpoint username',
}, {
  fieldType: TEXT_FIELD,
  name: 'default_password',
  label: 'Password',
  validate: required({ msg: 'Password is required' }),
  placeholder: 'Endpoint password',
  type: 'password',
}, {
  key: 'credentials-validate-button',
  fieldType: BUTTON,
  label: 'Validate',
  onClick: () => console.log('Validate clicked'),
}];

export const openStackEvents = [{
  fieldType: FIELD_GROUP,
  label: 'Event stream',
  name: 'event_stream_selection',
  fields: [{
    type: 'radio',
    value: 'ceilometer',
    label: 'Ceilometer',
    id: 'ceilometer-radio',
  }, {
    type: 'radio',
    value: 'amqp',
    label: 'AMQP',
    id: 'amqp-radio',
  }],
}];

export const openStactRSA = [{
  fieldType: TEXT_FIELD,
  name: 'ssh_keypair_username',
  label: 'Username',
  validate: required({ msg: 'Username is required' }),
  placeholder: 'RSA username',
}, {
  fieldType: TEXT_FIELD,
  name: 'ssh_keypair_password',
  label: 'Password',
  validate: required({ msg: 'Password is required' }),
  placeholder: 'RSA key',
}];
