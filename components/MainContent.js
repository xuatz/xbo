import React, { Component } from 'react';

import List from './List';
import GroupCards from './GroupCards';

import { Container, Item } from './FlexContainer';

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

class MainContent extends Component {
    state = {};

    componentDidMount() {
        // Actions.fetchPushes();
    }

    render() {
        return (
            <Container>
                <Item style={styles.latestPushes}>
                    <h1>Latest Pushes</h1>
                    <List pushes={this.props.pushes} />
                </Item>
                <Item style={styles.autoCategories}>
                    <h1>Auto Categories</h1>
                    <GroupCards />
                </Item>
            </Container>
        );
    }
}

export default MainContent;
