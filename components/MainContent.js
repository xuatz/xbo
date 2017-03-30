import React, { Component } from 'react';

import List from './List';
import GroupCards from './GroupCards';

import { Container, Item } from './FlexContainer';

import { initStore, fetchBookmarks } from '../store';
import withRedux from 'next-redux-wrapper';

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
    let bookmarks = state.bookmarks || [];

    return {
        latestBookmarks: bookmarks.sort(function(a, b) {
            return b.pushBody.modified - a.pushBody.modified;
        }).slice(0, 25)
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
                    <GroupCards />
                </Item>
            </Container>
        );
    }
}

export default withRedux(initStore, mapStateToProps)(MainContent);
