import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions/bookmarkActions';
import { UnorganizedBookmark } from '../Bookmark';
import { CarouselWrapper, Arrow, CarouselContent } from './styles';

class Carousel extends Component {
  state = {
    index: 0
  };

  goLeft = () => {
    this.setState(state => ({ index: Math.max(0, state.index - 1) }));
  };

  goRight = () => {
    this.setState((state, props) => ({
      index: Math.min(props.bookmarks.length - 1, state.index + 1)
    }));
  };

  render() {
    let { index } = this.state;
    let { bookmarks } = this.props;
    let currentBookmarkAtIndex = bookmarks[index];

    if (!currentBookmarkAtIndex) {
      return null;
    }

    return (
      <CarouselWrapper>
        <Arrow onClick={this.goLeft}>&lt;</Arrow>
        <CarouselContent>
          <UnorganizedBookmark
            key={currentBookmarkAtIndex._id}
            bk={currentBookmarkAtIndex}
          />
        </CarouselContent>
        <Arrow onClick={this.goRight}>&gt;</Arrow>
      </CarouselWrapper>
    );
  }
}

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

    return <Carousel bookmarks={bookmarks} />;
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
