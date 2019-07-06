import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';

import Button from './Button';

const stories = storiesOf('Button', module);
stories.addDecorator(withKnobs);

stories.add('with props', () => {
  const props = {
    disabled: boolean('Disabled', false),
    variant: select('Variant', ['default', 'full-width'])
  };

  return <Button {...props}>{text('Label', 'Label')}</Button>;
});
