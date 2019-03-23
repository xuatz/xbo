import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions/bookmarkActions';
import Bookmark from './Bookmark';

const mapStateToProps = state => {
  let bookmarks = [];
  console.log(state.bookmarks.sublists);
  console.log(state.bookmarks.bookmarks.entities);

  if (state.bookmarks.sublists) {
    const { link, note } = state.bookmarks.sublists;
    bookmarks = []
      .concat(link)
      .concat(note)
      .map(id => state.bookmarks.bookmarks.entities[id])
      .sort((a, b) => b.data.modified - a.data.modified);
  }

  return {
    bookmarks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

class Untitled extends Component {
  state = {
    listSize: 10,
    lastLoadTime: Date.now()
  };

  componentDidMount() {
    this.props.actions.fetchBookmarks().then(res => {
      // console.log("fetch complete!"); // TODO:XZ: will use this for infinite scroll in future
    });

    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    const now = Date.now();
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 600 &&
      this.props.bookmarks.length &&
      now - this.state.lastLoadTime > 0.25 * 1000
    ) {
      // console.log(now, this.state.lastLoadTime);
      this.setState(prevState => ({
        lastLoadTime: now,
        listSize: prevState.listSize + 10
      }));
    }
  };

  handleOnDelete = id => this.props.actions.deleteBookmark(id);

  render() {
    let sublist = this.props.bookmarks.slice(
      0,
      Math.min(this.state.listSize, this.props.bookmarks.length - 1)
    );

    return (
      <div>
        <ul>
          {sublist &&
            sublist.map((bk, index) => {
              return (
                <Bookmark key={index} bk={bk} onDelete={this.handleOnDelete} />
              );
            })}
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Untitled);
