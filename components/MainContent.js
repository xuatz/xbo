import React, { Component } from 'react';

import List from './List';
import GroupCards from './GroupCards';

import { Container, Item } from './common/FlexContainer';

import { initStore, fetchBookmarks } from '../store';
import withRedux from 'next-redux-wrapper';

import _ from 'lodash';

const styles = {
	latestPushes: {
		flex: '1',
		border: '1px solid #DDD'
	},
	autoCategories: {
		flex: '5',
		border: '1px solid #DDD'
	}
};

const mapStateToProps = state => {
	let { bookmarks = [], stats: { groupByDomain = [] } = {} } = state;

	return {
		popularDomains: groupByDomain
			.sort(function(a, b) {
				return b.bookmarks.length - a.bookmarks.length;
			})
			.slice(0, 9),
		latestBookmarks: bookmarks
			.sort(function(a, b) {
				return b.pushBody.created - a.pushBody.created;
			})
			.slice(0, 25)
	};
};

class MainContent extends Component {
	state = {};

	componentDidMount() {
		// this.props.dispatch(fetchBookmarks());
	}

	render() {
		return (
			<div>
				<div>
					<a href="http://localhost:9000/auth/connect/pushbullet">
						Connect with PushBullet
					</a>
				</div>
				<Container>
					<Item style={styles.autoCategories}>
						<h1>Auto Categories</h1>
						<GroupCards popularDomains={this.props.popularDomains} />
					</Item>
					<Item style={styles.latestPushes}>
						<h1>Latest Pushes</h1>
						<List bookmarks={this.props.latestBookmarks || []} />
					</Item>
				</Container>
			</div>
		);
	}
}

export default withRedux(initStore, mapStateToProps)(MainContent);
