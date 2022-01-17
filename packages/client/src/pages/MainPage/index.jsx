import React from 'react'
import styled from 'styled-components'
import Push from '../../components/PushV2'

const Wrapper = styled.section`
  padding: 2em 6em;
  background: papayawhip;
`

const MainPage = (props) => {
  return (
    <Wrapper>
      <Push />
    </Wrapper>
  )
}

export default MainPage
