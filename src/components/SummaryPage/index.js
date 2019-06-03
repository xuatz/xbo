import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Queue from './Queue';
import Bundle from './Bundle';
import * as actions from '../../actions/bookmarkActions';
import { SectionHeader } from './styles';

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

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SummaryPage);
