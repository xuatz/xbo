import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as actions from 'src/actions/bookmarkActions';
import fromEntries from 'src/utils/fromEntries';
import { Bookmark } from 'src/components/Bookmark';

class Bundle extends Component {
  render() {
    let { groupByDomain } = this.props;

    return (
      <div>
        {Object.entries(groupByDomain).map(([domain, bookmarks]) => {
          return (
            <div key={domain}>
              <div>{domain}</div>
              {bookmarks.map(bookmark => (
                <Bookmark key={bookmark._id} bookmark={bookmark} />
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // TODO: denormalize at lower level to avoid performance issues
    groupByDomain: fromEntries(
      _.shuffle(Object.entries(state.bookmarks.stats.groupByDomain))
        .slice(0, 3)
        .map(([domain, bookmarks]) => {
          return [
            domain,
            bookmarks.map(id => state.bookmarks.bookmarks.entities[id])
          ];
        })
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
)(Bundle);
