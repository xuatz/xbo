import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { COLOR, FONT_SIZE } from '../styles'

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 1rem 0.3rem;
`

const Label = styled.label`
  color: ${COLOR.BLACK};
  font-size: 0.9rem;
  margin-left: 0.3rem;
  margin-bottom: 0.3rem;
`

const StyledInput = styled.input`
  background-color: ${COLOR.WHITE};
  border: 1px solid rgb(0, 0, 0, 0.1);
  border-radius: 0.3rem;
  box-shadow: rgb(0, 0, 0, 0.1) 0px 0px 3px;
  color: ${COLOR.BLACK};
  font-size: ${FONT_SIZE.NORMAL};
  outline: none;
  padding: 0.5rem;

  &:hover,
  &:focus {
    border-color: ${COLOR.NEUTRAL.NORMAL};
  }

  &::placeholder {
    color: ${COLOR.NEUTRAL.NORMAL};
    font-size: ${FONT_SIZE.SMALL};
  }
`

const InvisibleInput = styled.input`
  border: none;
  background-image: none;
  background-color: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  outline: none;
`

class InputText extends Component {
  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(e) {
    this.props.onChange(e.target.value)
  }

  render() {
    const { id, label, placeholder, style, variant } = this.props
    let Input
    switch (variant) {
      case 'invisible':
        Input = InvisibleInput
        break
      default:
        Input = StyledInput
    }

    return (
      <InputWrapper className="field-text" id={id} style={style}>
        <Label className="field-text__label">{label}</Label>
        <Input
          className="field-text__input"
          onChange={this.handleOnChange}
          placeholder={placeholder}
        />
      </InputWrapper>
    )
  }
}

InputText.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  variant: PropTypes.oneOf(['default', 'invisible']),
}

InputText.defaultProps = {
  disabled: false,
  id: null,
  onChange: () => {},
  placeholder: '',
  style: undefined,
  variant: 'default',
}

export default InputText
