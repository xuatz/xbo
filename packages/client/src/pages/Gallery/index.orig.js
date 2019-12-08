import * as actions from 'src/actions/bookmarkActions';

import React, { Component } from 'react';

import Push from './Push';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

const mapStateToProps = state => {
  const { bookmarks } = state;
  const gallery = bookmarks.sublists.gallery.map(
    id => bookmarks.bookmarks.entities[id]
  );

  return {
    bookmarks: gallery
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

class Gallery extends Component {
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

  pushRenderer = data => {
    let { type, modified, title, url } = data;
    switch (type) {
      case 'link': {
        return (
          <div>
            <p>{moment.unix(modified).format('dddd, MMMM Do YYYY, h:mm a')}</p>
            <p> {title} </p>
            <p> {url} </p>
          </div>
        );
      }
      default: {
        return (
          <div>
            {/* <pre>{JSON.stringify(data, 0, 2)}</pre> */}
            <Push data={data} />
          </div>
        );
        // return (
        //   <div>
        //     <h3>unhandled type: {type}</h3>
        //     <p> {JSON.stringify(data, null, 2)} </p>
        //   </div>
        // );
      }
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
                        justifyContent: 'space-evenly'
                      }}
                    >
                      {/* <QuickActions
                      id={bk._id}
                      deleteBookmark={this.props.actions.deleteBookmark}
                    /> */}
                      {this.pushRenderer(bk.data)}
                      <div>
                        <button
                          style={{ padding: '10px', textAlign: 'center' }}
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
)(Gallery);
