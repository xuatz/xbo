import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as actions from "../actions/bookmarkActions";

const mapStateToProps = state => {
    return {};
};
const mapDispatchToProps = state => {
    return {};
};

class UncategorisedBookmarks extends Component {
    render() {
        return (
            <div>
                yahoo!
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    UncategorisedBookmarks
);
