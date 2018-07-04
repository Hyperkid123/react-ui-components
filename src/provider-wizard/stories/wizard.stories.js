import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import ProviderWizard from '../provider-wizard';
import { defaultFormComponents, openStackCredentials, openStackEvents, openStactRSA } from '../formsComponents';

const stepsMap = step => ({
  0: defaultFormComponents,
  1: openStackCredentials,
  2: openStackEvents,
  3: openStactRSA,
})[step];

storiesOf('Provider', module).add('Wizard', withInfo()(() => (
  <ProviderWizard stepsMap={stepsMap} />
)));
