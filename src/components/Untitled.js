import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions/bookmarkActions";

const mapStateToProps = state => {
  let bookmarks = [];

  if (state.bookmarks.sublists) {
    const { link, note } = state.bookmarks.sublists;
    bookmarks = bookmarks
      .concat(link)
      .concat(note)
      .filter(bk => bk !== undefined)
      .sort((a, b) => b.data.modified - a.data.modified);
  }

  return {
    bookmarks
  };
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

class UrlAndNoteItem extends Component {
  state = {
    isOpen: false
  };

  handleOnClick = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    const { item, style } = this.props;
    const { title, url, type, body } = item.data;
    return (
      <div onClick={this.handleOnClick} style={style}>
        {type === "note" ? (
          <div>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ) : (
          <div>
            <a target="_blank" href={url}>
              {title || url}
            </a>
          </div>
        )}

        {this.state.isOpen && <pre>{JSON.stringify(item.data, 0, 2)}</pre>}
      </div>
    );
  }
}

class Untitled extends Component {
  state = {
    listSize: 10,
    lastLoadTime: Date.now()
  };

  componentDidMount() {
    this.props.actions.fetchBookmarks().then(res => {
      // console.log("fetch complete!"); // TODO:XZ: will use this for infinite scroll in future
    });

    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  onScroll = () => {
    const now = Date.now();
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 600 &&
      this.props.bookmarks.length &&
      now - this.state.lastLoadTime > 0.25 * 1000
    ) {
      // console.log(now, this.state.lastLoadTime);
      this.setState(prevState => ({
        lastLoadTime: now,
        listSize: prevState.listSize + 10
      }));
    }
  };

  handleOnDelete = id => this.props.actions.deleteBookmark(id);

  render() {
    let sublist = this.props.bookmarks.slice(
      0,
      Math.min(this.state.listSize, this.props.bookmarks.length - 1)
    );

    return (
      <div>
        <ul>
          {sublist &&
            sublist.map((bk, index) => {
              return (
                <li key={index}>
                  <div
                    style={{
                      background: "teal",
                      padding: "20px"
                      // width: "50%"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        background: "white",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around"
                        // justifyContent: "flex-start"
                      }}
                    >
                      <UrlAndNoteItem
                        style={{
                          flex: "5"
                          // background: "green"
                        }}
                        item={bk}
                      />
                      <div
                        style={{
                          flex: "1"
                          // background: "red"
                        }}
                      >
                        <button
                          style={{
                            padding: "10px",
                            textAlign: "center"
                          }}
                          onClick={() => this.handleOnDelete(bk._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Untitled);
