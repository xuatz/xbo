import * as actions from '../actions/bookmarkActions';

import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';

const Input = styled.input`
  padding: 10px;
  width: 40%;
`;

const empty = [];

const mapStateToProps = state => {
  return {
    bookmarks: state.bookmarks.uncategorised || empty,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

class UncategorisedBookmarks extends Component {
  componentDidMount() {
    this.props.actions.getBookmarksUncategorised();
  }

  render() {
    const pushRenderer = data => {
      let { type, modified, title, url } = data;
      switch (type) {
        case 'link': {
          return (
            <div>
              <p>
                {moment.unix(modified).format('dddd, MMMM Do YYYY, h:mm a')}
              </p>
              <p> {title} </p>
              <p> {url} </p>
            </div>
          );
        }
        default: {
          return (
            <div>
              <h3>unhandled type: {type}</h3>
              <pre>{JSON.stringify(data, 0, 2)}</pre>
            </div>
          );
        }
      }
    };

    return (
      <div>
        <ul>
          {this.props.bookmarks.map((bk, index) => {
            return (
              <li key={index}>
                <div>
                  <div>
                    <Input
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
                  </div>
                  <div>
                    <button>Delete</button>
                    <button>Archive</button>
                    <Input
                      type="text"
                      placeholder="tags (e.g. bitcoin, react, anime, ...)"
                    />
                  </div>
                  {pushRenderer(bk.data)}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UncategorisedBookmarks);
