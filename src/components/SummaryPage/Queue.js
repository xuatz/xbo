import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions/bookmarkActions';
import { UnorganizedBookmark } from '../Bookmark';
import {
  CarouselWrapper,
  Arrow,
  CarouselContent,
  Indicator,
  IndicatorDot
} from './styles';
import { ArrowLeftIcon, ArrowRightIcon, CheckmarkIcon } from '../common/icons';

const CarouselIndicator = props => {
  let { index, progress } = props;
  return (
    <Indicator>
      {progress.map((p, i) => (
        <IndicatorDot key={i} current={i === index}>
          {p ? <CheckmarkIcon /> : null}
        </IndicatorDot>
      ))}
    </Indicator>
  );
};

class Carousel extends Component {
  state = {
    index: 0
  };

  goLeft = () => {
    this.setState(state => ({
      index:
        state.index === 0 ? this.props.bookmarks.length - 1 : state.index - 1
    }));
  };

  goRight = () => {
    this.setState((state, props) => ({
      index: Math.abs((state.index + 1) % this.props.bookmarks.length)
    }));
  };

  render() {
    let { index } = this.state;
    let { bookmarks, onTagsUpdated } = this.props;
    let currentBookmarkAtIndex = bookmarks[index];

    if (!currentBookmarkAtIndex) {
      return null;
    }

    let progress = bookmarks.map(
      bookmark => bookmark && bookmark.tags && bookmark.tags.length > 0
    );

    return (
      <CarouselWrapper>
        <Arrow onClick={this.goLeft}>
          <ArrowLeftIcon />
        </Arrow>
        <CarouselContent>
          <UnorganizedBookmark
            key={currentBookmarkAtIndex._id}
            bk={currentBookmarkAtIndex}
            onTagsUpdated={onTagsUpdated(currentBookmarkAtIndex._id)}
          />
          <CarouselIndicator index={index} progress={progress} />
        </CarouselContent>
        <Arrow onClick={this.goRight}>
          <ArrowRightIcon />
        </Arrow>
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

  onTagsUpdated = id => tags => {
    this.props.actions.updateBookmarkTags(id, tags);
  };

  render() {
    let { firstLoad } = this.state;
    let { bookmarks } = this.props;
    let isDone =
      bookmarks.length ===
      bookmarks.filter(
        bookmark => bookmark && bookmark.tags && bookmark.tags.length
      ).length;
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
      <Carousel bookmarks={bookmarks} onTagsUpdated={this.onTagsUpdated} />
    );
  }
}

const mapStateToProps = state => {
  return {
    bookmarks: state.bookmarks.uncategorised.map(
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
)(Queue);
