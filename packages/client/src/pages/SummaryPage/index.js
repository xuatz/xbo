import * as actions from 'src/actions/bookmarkActions';

import React, { Component } from 'react';

import Bundle from './Bundle';
import Queue from './Queue';
import { SectionHeader } from './styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class SummaryPage extends Component {
  componentDidMount() {
    this.props.actions.fetchBookmarks();
  }

  render() {
    return (
      <div>
        <SectionHeader>Organise bookmarks</SectionHeader>
        <Queue />
        <SectionHeader>Check out these topics</SectionHeader>
        <Bundle />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(SummaryPage);
