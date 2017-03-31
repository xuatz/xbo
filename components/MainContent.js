import React, { Component } from 'react';

import List from './List';
import GroupCards from './GroupCards';

import { Container, Item } from './FlexContainer';

import { initStore, fetchBookmarks } from '../store';
import withRedux from 'next-redux-wrapper';

import _ from 'lodash';

const styles = {
    latestPushes: {
        flex: '2',
        border: '1px solid #DDD',
    },
    autoCategories: {
        flex: '5',
        border: '1px solid #DDD',
    },
};

const mapStateToProps = state => {
    let {
        bookmarks = [],
        stats: {
            groupByDomain = [],
        } = {},
    } = state;

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
            .slice(0, 25),
    };
};

class MainContent extends Component {
    state = {};

    componentDidMount() {
        this.props.dispatch(fetchBookmarks());
    }

    render() {
        return (
            <Container>
                <Item style={styles.latestPushes}>
                    <h1>Latest Pushes</h1>
                    <List bookmarks={this.props.latestBookmarks || []} />
                </Item>
                <Item style={styles.autoCategories}>
                    <h1>Auto Categories</h1>
                    <GroupCards popularDomains={this.props.popularDomains} />
                </Item>
            </Container>
        );
    }
}

export default withRedux(initStore, mapStateToProps)(MainContent);
