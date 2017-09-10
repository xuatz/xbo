import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import styled from "styled-components";

const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
`;

let url =
    "https://www.pushbullet.com/authorize?client_id=" +
    "2TXDmPJN0tukzOqu19qvwNCju16SyMb7" +
    "&redirect_uri=" +
    "http://localhost:9000/auth/connect/pushbullet/callback" +
    "&response_type=" +
    "code";

const mapStateToProps = state => {
    return {
        providers: state.session.user.providers
    };
};

const mapDispatchToProps = dispatch => ({
    //xz: sample for different pattern to bindActionCreators
    // actions: bindActionCreators({
    // 	...inboundActions,
    // 	load: (line) => {
    // 		return (dispatch) => {
    // 			dispatch(actions.load('line', line))
    // 		}
    // 	}
    // }, dispatch)
    // actions: bindActionCreators(actions, dispatch)
    // load: line => {
    // 	dispatch(actions.load("line", line));
    // }
});

class Profile extends Component {
    render() {
        return (
            <Wrapper>
                {this.props.providers.pushbullet ? (
                    "Connected with Pushbullet!"
                ) : (
                    <a href={url}>
                        <button>Connect with pushbullet</button>
                    </a>
                )}
            </Wrapper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
