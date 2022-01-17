import { COLOR, FONT } from 'src/components/styles'

import styled from 'styled-components'

export const ProviderContainer = styled.section`
  display: flex;
  margin-bottom: 1rem;
`

export const Provider = styled.div`
  align-items: center;
  background-color: ${COLOR.WHITE};
  border: 1px solid ${COLOR.NEUTRAL.NORMAL};
  border-radius: 3px;
  box-shadow: rgb(0, 0, 0, 0.1) 0px 0px 3px;
  color: ${COLOR.NEUTRAL.DARKER};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 1rem;
  transition: all 0.3s;
  width: 200px;

  &:hover {
    color: ${COLOR.BLACK};
    transform: scale(1.05, 1.05);
  }
`

export const ProviderLogo = styled.img`
  width: 100px;
  height: 100px;
  padding-bottom: 1rem;
`

export const ProfileSettings = styled.section`
  margin: 1rem;
`

export const Header = styled.header`
  font-family: ${FONT.TITLE};
  font-size: 1.5rem;
  font-weight: 400;
`
