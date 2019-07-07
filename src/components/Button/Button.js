import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { COLOR } from '../styles';

const StyledButton = styled.button`
  border: none;
  border-radius: 0.3rem;
  font-size: 0.9rem;
  margin: 0.5rem;
  outline: none;
  padding: 0.5rem 0.8rem;
  transition: all 0.5s;
  width: fit-content;

  &:hover {
    transform: scale(1.05, 1.05);
  }

  ${props =>
    props.fullWidth &&
    `
      width: fill-available;
  `}

  ${props =>
    props.variant === 'default' &&
    `
    background-color: ${COLOR.PRIMARY.NORMAL};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 3px;
    color: ${COLOR.WHITE};

    &:hover {
      background-color: ${COLOR.PRIMARY.DARKER};
    }
  `}

  ${props =>
    props.variant === 'secondary' &&
    `
    background-color: ${COLOR.NEUTRAL.LIGHTERER};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 3px;
    color: ${COLOR.BLACK};

    &:hover {
      background-color: ${COLOR.NEUTRAL.LIGHTER};
    }
  `}

  ${props =>
    props.variant === 'text' &&
    `
    background-color: transparent;
    box-shadow: none;
    color: ${COLOR.BLACK};

    &:hover {
      background-color: ${COLOR.NEUTRAL.LIGHTERER};
    }
  `}

  ${props =>
    props.disabled &&
    `
      background-color: ${COLOR.NEUTRAL.LIGHTER};
      color: ${COLOR.NEUTRAL.DARKER};
      cursor: not-allowed;
      opacity: 0.9;

      &:hover {
        background-color: ${COLOR.NEUTRAL.NORMAL};
      }
  `}
`;

const Button = props => {
  const { children } = props;
  return <StyledButton {...props}>{children}</StyledButton>;
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'text', 'secondary'])
};

Button.defaultProps = {
  disabled: false,
  fullWidth: false,
  onClick: () => {},
  variant: 'default'
};

export default Button;
