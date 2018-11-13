import * as ReactDOM from 'react-dom';
import * as React from 'react';
import FormRendeer from '../src/forms/data-driven-form/form-renderer';
import { arraySchemaResult } from '../src/forms/data-driven-form/demoSchemas/widgetsSchema';

export default function renderApp() {
  ReactDOM.render(
    <FormRendeer
      formType="pf3"
      onSubmit={console.log}
      onCancel={() => console.log('Canceled')}
      canReset
      schema={arraySchemaResult}
    />,
    document.getElementById('demo-app'),
  );
}
