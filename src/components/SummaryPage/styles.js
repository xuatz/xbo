import styled from 'styled-components';
import { FONT } from '../styles';

export const SectionHeader = styled.h2`
  font-family: ${FONT.TITLE};
`;

export const CarouselWrapper = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Arrow = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 0;
  padding: 1rem;

  &:hover {
    background-color: rgb(0, 0, 0, 0.1);
  }
`;

export const CarouselContent = styled.div`
  flex: 1 1 0;
  word-break: break-word;
`;
