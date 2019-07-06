import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from 'src/actions/bookmarkActions';
import { Bookmark } from 'src/components/Bookmark';

const Tabs = props => {
  return (
    <ul>
      <li>All bookmarks</li>
      <li>
        Hashtags
        <ul>
          <li>Nothing here yet</li>
        </ul>
      </li>
    </ul>
  );
};

class StreamPage extends Component {
  componentDidMount() {
    this.props.actions.fetchBookmarks();
  }

  render() {
    let { bookmarks } = this.props;
    return (
      <div>
        <Tabs />
        <div>
          {bookmarks.map((bookmark, index) => (
            <Bookmark key={index} bookmark={bookmark} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bookmarks: state.bookmarks.bookmarks.result.map(
      id => state.bookmarks.bookmarks.entities[id]
    )
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
)(StreamPage);
