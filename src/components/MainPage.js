import React from 'react';
import styled from 'styled-components';
import Untitled from './Untitled';

const Wrapper = styled.section`
  padding: 2em 6em;
  background: papayawhip;
`;

const MainPage = props => {
  return (
    <Wrapper>
      <Untitled />
    </Wrapper>
  );
};

export default MainPage;
