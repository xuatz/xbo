import React, { Component } from 'react';
import styled from 'styled-components';

import Code from '../common/Code';

class UrlAndNoteItem extends Component {
  state = {
    isOpen: false
  };

  handleOnClick = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    const { item, style } = this.props;
    const { title, url, type, body } = item.data;
    return (
      <div onClick={this.handleOnClick} style={style}>
        {type === 'note' ? (
          <div>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ) : (
          <div>
            <a target="_blank" href={url}>
              {title || url}
            </a>
          </div>
        )}

        {this.state.isOpen && <Code>{JSON.stringify(item.data, 0, 2)}</Code>}
      </div>
    );
  }
}

const ListItemWrapper = styled.li`
  background: teal;
  padding: 20px;
  /* width: 50%; */
`;

const ListItem = styled.div`
  background: white;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  // justify-content: flex-start;
`;

const Actions = styled.div`
  flex: 1;
  // background: red;
`;

const Button = styled.button`
  padding: 10x;
  text-align: center;
`;

const Bookmark = props => {
  let { bk, onDelete } = props;
  return (
    <ListItemWrapper>
      <ListItem>
        <UrlAndNoteItem
          style={{
            flex: '5'
            // background: "green"
          }}
          item={bk}
        />
        <Actions>
          <Button onClick={() => onDelete(bk._id)}>Delete</Button>
        </Actions>
      </ListItem>
    </ListItemWrapper>
  );
};

export default Bookmark;
