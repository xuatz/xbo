import React from "react";

const styles = {
    container: {
        display: "flex"
    },
    item: {
        flex: "auto"
    }
};

export const Container = ({ style = {}, children }) =>
    <div
        style={{
            ...styles.container,
            ...style
        }}>
        {children}
    </div>;

export const Item = ({ style = {}, children }) =>
    <div
        style={{
            ...styles.item,
            ...style
        }}>
        {children}
    </div>;
