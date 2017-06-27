import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";

import {
    Container
    // Item
} from "./common/FlexContainer";
import * as actions from "../actions/bookmarkActions";

const mapStateToProps = state => {
    let {
        bookmarks = [],
        stats: { groupByDomain = [] } = {}
    } = state.bookmarks;
    return {
        popularDomains: groupByDomain
            ? groupByDomain
                  .sort((a, b) => b.bookmarks.length - a.bookmarks.length)
                  .slice(0, 9)
            : [],
        latestBookmarks: bookmarks
            ? bookmarks
                  .sort((a, b) => b.data.created - a.data.created)
                  .slice(0, 25)
            : []
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

// const styles = {
//     autoCategories: {
//         flex: "3",
//         border: "1px solid #DDD"
//     },
//     latestPushes: {
//         flex: "1",
//         border: "1px solid #DDD"
//     }
// };

const ShittyHeader = props => {
    let url =
        "https://www.pushbullet.com/authorize?client_id=" +
        "2TXDmPJN0tukzOqu19qvwNCju16SyMb7" +
        "&redirect_uri=" +
        "http://localhost:9000/auth/connect/pushbullet/callback" +
        "&response_type=" +
        "code";

    let linkStyle = {
        display: "inline-block",
        padding: "10px 5px"
    };
    return (
        <div>
            <div style={linkStyle}>
                <a href={url}>
                    Connect with PushBullet
                </a>
            </div>
            <div style={linkStyle}>
                <button
                    href="#"
                    onClick={e => {
                        let API = axios.create({
                            baseURL:
                                process.env.REACT_APP_API_URL ||
                                    "http://localhost:9000",
                            withCredentials: true,
                            timeout: 5000
                        });

                        API.get("/auth/logout").then(res => {
                            window.location.reload();
                        });
                    }}>
                    shitty logout
                </button>
            </div>

        </div>
    );
};

class MainPage extends Component {
    componentDidMount() {
        // this.props.actions.fetchBookmarks();
    }

    render() {
        return (
            <div>
                <ShittyHeader />
                <Container>
                    {/*
                    <Item style={styles.autoCategories}>
                        <h1>Auto Categories</h1>
                        <GroupCards
                            popularDomains={this.props.popularDomains}
                        />
                    </Item>
                    <Item style={styles.latestPushes}>
                        <h1>Latest Pushes</h1>
                        <List bookmarks={this.props.latestBookmarks || []} />
                    </Item>
                
                    */}
                    Container Placeholder
                </Container>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
