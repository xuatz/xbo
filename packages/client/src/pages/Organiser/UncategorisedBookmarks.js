import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions/bookmarkActions';

import Bookmark from './Bookmark';

const empty = [];

const mapStateToProps = (state) => {
  return {
    bookmarks:
      state.bookmarks.uncategorised.map(
        (id) => state.bookmarks.bookmarks.entities[id]
      ) || empty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

class UncategorisedBookmarks extends Component {
  componentDidMount() {
    this.props.actions.getBookmarksUncategorised();
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.bookmarks.map((bk, index) => {
            return <Bookmark key={index} bk={bk} />;
          })}
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UncategorisedBookmarks);
