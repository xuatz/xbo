import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'

import InputText from './InputText'

const stories = storiesOf('InputText', module)
stories.addDecorator(withKnobs)

stories.add('with props', () => {
  const props = {
    disabled: boolean('Disabled', false),
    label: text('Label', 'Field'),
    placeholder: text('Placeholder', 'Placeholder for field'),
    variant: select('Variant', ['default', 'full-width']),
  }

  return <InputText {...props} />
})

stories.add('multiple', () => {
  return (
    <>
      <InputText label="Field 1" placeholder="Placeholder for field 1" />
      <InputText label="Field 2" placeholder="Placeholder for field 2" />
    </>
  )
})
