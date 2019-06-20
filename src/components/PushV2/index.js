import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions/bookmarkActions';
import UrlAndNoteItem from './url-and-note';

const mapStateToProps = state => {
  let bookmarks = [];

  if (state.bookmarks.sublists) {
    const { link, note } = state.bookmarks.sublists;
    bookmarks = bookmarks.concat(link).concat(note);
    bookmarks = bookmarks
      .map(bookmarkId => state.bookmarks.bookmarks.entities[bookmarkId])
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

class PushV2 extends Component {
  state = {
    listSize: 10,
    lastLoadTime: Date.now()
  };

  componentDidMount() {
    this.props.actions.fetchBookmarks().then(res => {
      // console.log("fetch complete!"); // TODO:XZ: will use this for infinite scroll in future
    });

    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    const now = Date.now();
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 900 &&
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

  handleFilterOnChange = e => {
    // console.log(e);
    // console.log(e.target);
    // console.log(e.target.value);
    this.setState({
      filter: e.target.value
    });
  };

  render() {
    let sublist = this.props.bookmarks
      .filter(item => {
        const pattern = this.state.filter;
        if (!pattern || pattern === '') {
          return true;
        }

        const { title = '', url = '', body = '' } = item.data;

        return (
          title.toLowerCase().includes(pattern.toLowerCase()) ||
          url.toLowerCase().includes(pattern.toLowerCase()) ||
          body.toLowerCase().includes(pattern.toLowerCase())
        );
      })
      .slice(0, Math.min(this.state.listSize, this.props.bookmarks.length - 1));

    return (
      <div>
        <div style={{ padding: '20px' }}>
          <input
            style={{ padding: '5px' }}
            onChange={this.handleFilterOnChange}
            value={this.state.filter}
          />
        </div>
        <div>
          <ul>
            {sublist &&
              sublist.map((bk, index) => {
                return (
                  <li key={index}>
                    <div
                      style={{
                        background: 'teal',
                        padding: '20px'
                        // width: "50%"
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          background: 'white',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-around'
                          // justifyContent: "flex-start"
                        }}
                      >
                        <UrlAndNoteItem
                          style={{
                            flex: '5'
                            // background: "green"
                          }}
                          item={bk}
                        />
                        <div
                          style={{
                            flex: '1'
                            // background: "red"
                          }}
                        >
                          <button
                            style={{
                              padding: '10px',
                              textAlign: 'center'
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
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PushV2);
