import styled from 'styled-components';

import { FONT_SIZE } from '../styles';

export const Wrapper = styled.div`
  border: 1px solid #eee;
  border-radius: 3px;
  margin: 10px;
  padding: 5px;
`;

export const ActionToolbar = styled.div`
  margin: 5px;
`;

export const Tag = styled.span`
  background-color: ${(props) => (props.isSelected ? '#eee' : 'none')};
  border-radius: 0.5rem;
  font-size: ${FONT_SIZE.SMALLER};
  margin: 0.3rem;
  outline: none;
  padding: 0.3rem 0.5rem;
  width: fit-content;
`;

export const Title = styled.div`
  margin: 5px;
`;

export const Url = styled.a`
  margin: 5px;
  text-decoration: underline;
`;
