import React from "react";

const layoutStyle = {
    margin: "15px 10px",
    padding: "15px 10px"
    // border: '1px solid #DDD'
};

export default props => (
    <div style={layoutStyle}>
        {props.children}
    </div>
);
