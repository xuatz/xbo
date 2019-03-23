import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions/bookmarkActions';
import { UnorganizedBookmark } from '../Bookmark';

class Queue extends Component {
  state = {
    firstLoad: true // temporary - ideally would be something like a daily flag
  };

  componentDidMount() {
    this.props.actions.getBookmarksUncategorised();
  }

  componentDidUpdate() {
    if (this.state.firstLoad) {
      this.setState({ firstLoad: false });
    }
  }

  render() {
    let { firstLoad } = this.state;
    let { bookmarks } = this.props;
    let isDone =
      bookmarks.length ===
      bookmarks.filter(bookmark => bookmark.tags && bookmark.tags.length)
        .length;
    if (!firstLoad && isDone) {
      return (
        <div>
          <div>You're done for the day</div>
          <button>Organize more</button>
          <button>View organizer</button>
          <button>View feed</button>
        </div>
      );
    }

    return (
      <div>
        {bookmarks.map(bookmark => {
          return <UnorganizedBookmark key={bookmark._id} bk={bookmark} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bookmarks: state.bookmarks.uncategorised
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Queue);
