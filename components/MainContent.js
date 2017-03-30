import React, { Component } from 'react';

import List from './List';
import GroupCards from './GroupCards';

import { Container, Item } from './FlexContainer';

import { initStore, fetchPushes } from '../store';
import withRedux from 'next-redux-wrapper';

const styles = {
    latestPushes: {
        flex: '3',
        background: 'orange',
    },
    autoCategories: {
        flex: '5',
        background: 'lime',
    },
};

const mapStateToProps = state => {
    return {
        pushes: state.pushes,
    };
};

class MainContent extends Component {
    state = {};

    componentDidMount() {
        // this.props.dispatch(fetchPushes());
    }

    render() {
        // console.log('this.state', this.state);
        // console.log('this.props', this.props);
        return (
            <Container>
                <Item style={styles.latestPushes}>
                    <h1>Latest Pushes</h1>
                    <List pushes={this.props.pushes || []} />
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
