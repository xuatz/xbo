import React from 'react';

import { Wrapper, Title, Url, ActionToolbar } from './styles';

// An organized bookmark
const Bookmark = props => {
  const { title, url } = props.bookmark.data;
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Url href={url}>{url}</Url>
      <ActionToolbar>
        <button>Mark as read</button>
        <button>Delete</button>
        <button>Edit tags</button>
      </ActionToolbar>
    </Wrapper>
  );
};

export default Bookmark;
