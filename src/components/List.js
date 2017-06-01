import React from "react";
import Bookmark from "./Bookmark";

const List = ({ bookmarks }) => {
    return (
        <div
            style={{
                overflow: "scroll",
                height: "400px"
            }}>
            {bookmarks &&
                bookmarks.map((bookmark, key) => {
                    //TODO will need some renaming/refactoring in future
                    return <Bookmark key={key} bookmark={bookmark} />;
                })}
        </div>
    );
};

export default List;
