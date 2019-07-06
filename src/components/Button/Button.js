import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { COLOR } from '../styles';

const StyledButton = styled.button`
  background-color: ${COLOR.PRIMARY.NORMAL};
  border: 2px solid ${COLOR.PRIMARY.DARKER};
  border-radius: 0.3rem;
  color: ${COLOR.WHITE};
  font-size: 1rem;
  outline: none;
  padding: 0.3rem 0.5rem;

  &:hover {
    background-color: ${COLOR.PRIMARY.DARKER};
  }

  ${props =>
    props.variant === 'full-width' &&
    `
      width: fill-available;
  `}

  ${props =>
    props.disabled &&
    `
      border-color: ${COLOR.NEUTRAL.NORMAL};
      background-color: ${COLOR.NEUTRAL.NORMAL};
      cursor: not-allowed;

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
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'full-width'])
};

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
  variant: 'default'
};

export default Button;
