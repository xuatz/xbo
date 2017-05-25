import React, { Component } from 'react';
import axios from 'axios';

import List from './List';
import GroupCards from './GroupCards';

import { Container, Item } from './common/FlexContainer';

import { initStore } from '../store';

import { fetchBookmarks } from '../actions/bookmarkActions';

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
	let { bookmarks = [], stats: { groupByDomain = [] } = {} } = state.bookmarks;
	return {
		popularDomains: groupByDomain
			? groupByDomain
					.sort((a, b) => b.bookmarks.length - a.bookmarks.length)
					.slice(0, 9)
			: [],
		latestBookmarks: bookmarks
			? bookmarks.sort((a, b) => b.data.created - a.data.created).slice(0, 25)
			: []
	};
};

class MainContent extends Component {
	state = {};

	componentDidMount() {
		this.props.dispatch(fetchBookmarks());
	}

	render() {
		let url =
			'https://www.pushbullet.com/authorize?client_id=' +
			'2TXDmPJN0tukzOqu19qvwNCju16SyMb7' +
			'&redirect_uri=' +
			'http://localhost:9000/auth/connect/pushbullet/callback' +
			'&response_type=' +
			'code';

		return (
			<div>
				<div>
					<a href={url}>
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
