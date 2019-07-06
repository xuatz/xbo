import React from 'react';
import styled from 'styled-components';

import UncategorisedBookmarks from './UncategorisedBookmarks';

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const Organiser = props => {
  return (
    <Wrapper>
      <UncategorisedBookmarks />
    </Wrapper>
  );
};

export default Organiser;
