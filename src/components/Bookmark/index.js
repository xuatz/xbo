import React, { Component } from 'react';
import styled from 'styled-components';

import Push from './Push';

const Wrapper = styled.div`
  border: 1px solid #eee;
  border-radius: 3px;
  margin: 10px;
  padding: 5px;
`;

const Title = styled.div`
  margin: 5px;
`;

const Url = styled.a`
  margin: 5px;
  text-decoration: underline;
`;

const ActionToolbar = styled.div`
  margin: 5px;
`;

// An organized bookmark
export const Bookmark = props => {
  const { title, url, type, body } = props.bookmark.data;
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

// An unorganized bookmark
export const UnorganizedBookmark = props => {
  let { bk } = props;
  return (
    <Wrapper>
      <Push data={bk.data} />
      <ActionToolbar>
        <input
          type="text"
          placeholder="tags (e.g. bitcoin, react, anime, ...)"
        />
        <button>Archive</button>
        <button
          onClick={event => {
            this.props.actions.deleteBookmark(bk._id);
          }}
        >
          Delete
        </button>
      </ActionToolbar>
    </Wrapper>
  );
};
