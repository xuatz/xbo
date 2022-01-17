import { COLOR, FONT_SIZE } from 'src/components/styles'

import Button from 'src/components/Button/Button'
import styled from 'styled-components'

export const Padding = styled.div`
  box-sizing: border-box;
  display: inline-block;
  padding: 0.5rem;
  width: 50%;

  @media (min-width: 800px) {
    width: 33.333%;
  }
`

export const ImageBookmarkWrapper = styled.div`
  background-color: ${COLOR.WHITE};
  border: 1px solid ${COLOR.NEUTRAL.LIGHTER};
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 3px;
`

export const Image = styled.img`
  height: 200px;
  object-fit: cover;
  width: 100%;

  @media (min-width: 800px) {
    height: 250px;
  }
`

export const ImageDetails = styled.div`
  background-color: ${COLOR.WHITE};
  border-top: 1px solid ${COLOR.NEUTRAL.LIGHTEST};
  display: flex;
  flex-direction: column;
  padding: 1rem;
`

export const Filename = styled.header`
  font-size: 1rem;
`

export const DateTime = styled.span`
  color: ${COLOR.NEUTRAL.NORMAL};
  font-size: ${FONT_SIZE.SMALL};
`

export const Link = styled.a`
  color: ${COLOR.BLACK};
  text-decoration: none;
`

export const ActionButton = styled(Button)`
  margin: 1rem 0 0;
`
