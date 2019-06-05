import styled from 'styled-components';
import { FONT } from '../styles';

export const SectionHeader = styled.h2`
  font-family: ${FONT.TITLE};
`;

export const CarouselWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  width: auto;
`;

export const Arrow = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 0;
  padding: 0.5rem;

  &:hover {
    border-radius: 50%;
    background-color: rgb(0, 0, 0, 0.1);
  }
`;

export const CarouselContent = styled.div`
  flex: 1 1 0;
  word-break: break-word;
`;

export const Indicator = styled.div`
  display: flex;
`;

export const IndicatorDot = styled.span`
  border-radius: 50%;
  border: 1px solid #eee;
  height: 1rem;
  width: 1rem;
`;
