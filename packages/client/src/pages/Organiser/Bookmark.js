import React from 'react';
import styled from 'styled-components';

import Push from './Push';

const Input = styled.input`
  padding: 10px;
  width: 40%;
`;

const Bookmark = (props) => {
  let { bk } = props;
  return (
    <li>
      <Push data={bk.data} />
      <div>
        <Input
          type="text"
          placeholder="tags (e.g. bitcoin, react, anime, ...)"
        />
        <button>Archive</button>
        <button
          onClick={(event) => {
            this.props.actions.deleteBookmark(bk._id);
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Bookmark;
