import { FONT } from 'src/components/styles'
import styled from 'styled-components'

export const SectionHeader = styled.h2`
  font-family: ${FONT.TITLE};
`

export const CarouselWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  width: auto;
`

export const Arrow = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 0;
  padding: 0.5rem;

  &:hover {
    border-radius: 50%;
    background-color: rgb(0, 0, 0, 0.1);
  }
`

export const CarouselContent = styled.div`
  flex: 1 1 0;
  word-break: break-word;
`

export const Indicator = styled.div`
  display: flex;
`

export const IndicatorDot = styled.span`
  align-items: center;
  background-color: ${(props) => (props.current ? '#eee' : '#fff')};
  border-radius: 50%;
  border: 1px solid #555;
  display: flex;
  height: 1rem;
  justify-content: center;
  margin: 0.5rem;
  width: 1rem;
`
