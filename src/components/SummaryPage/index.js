import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Queue from './Queue';
import Bundle from './Bundle';
import * as actions from '../../actions/bookmarkActions';

class SummaryPage extends Component {
  componentDidMount() {
    this.props.actions.fetchBookmarks();
  }

  render() {
    return (
      <div>
        <h2>Organise bookmarks</h2>
        <Queue />
        <h2>Check out these topics</h2>
        <Bundle />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SummaryPage);
