import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'

import Button from './Button'

const stories = storiesOf('Button', module)
stories.addDecorator(withKnobs)

stories.add('overview', () => {
  return (
    <>
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button disabled>Disabled</Button>
      <Button variant="text">Text</Button>
      <Button fullWidth>Default Full Width</Button>
    </>
  )
})

stories.add('with props', () => {
  const props = {
    disabled: boolean('Disabled', false),
    variant: select('Variant', ['default', 'secondary', 'text']),
    fullWidth: boolean('Full width', false),
  }

  return <Button {...props}>{text('Label', 'Label')}</Button>
})
