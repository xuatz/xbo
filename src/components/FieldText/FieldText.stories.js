import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';

import FieldText from './FieldText';

const stories = storiesOf('FieldText', module);
stories.addDecorator(withKnobs);

stories.add('with props', () => {
  const props = {
    disabled: boolean('Disabled', false),
    label: text('Label', 'Field'),
    placeholder: text('Placeholder', 'Placeholder for field'),
    variant: select('Variant', ['default', 'full-width'])
  };

  return <FieldText {...props} />;
});

stories.add('multiple', () => {
  return (
    <>
      <FieldText label="Field 1" placeholder="Placeholder for field 1" />
      <FieldText label="Field 2" placeholder="Placeholder for field 2" />
    </>
  );
});
