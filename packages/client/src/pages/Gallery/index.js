import * as actions from 'src/actions/bookmarkActions';

import {
  ActionButton as Button,
  DateTime,
  Filename,
  Image,
  ImageBookmarkWrapper,
  ImageDetails,
  Link,
  Padding,
} from './styles';
import React, { useEffect, useState } from 'react';

import Page from 'src/components/Page';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import throttle from 'lodash/throttle';

const mapStateToProps = (state) => {
  const { bookmarks } = state;
  const gallery = bookmarks.sublists.gallery.map(
    (id) => bookmarks.bookmarks.entities[id]
  );

  return {
    bookmarks: gallery,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

const ImageBookmark = (props) => {
  const { bookmark, onDelete } = props;
  const { image_url, file_url, file_name, created } = bookmark.data;

  return (
    <Padding>
      <ImageBookmarkWrapper>
        <Link target="_blank" rel="noopener noreferrer" href={file_url}>
          <Image src={image_url} />
        </Link>
        <ImageDetails>
          <Filename>{file_name}</Filename>
          <DateTime>
            {moment(created, 'X.SSSSSSSSS').format('DD MMM YYYY')}
          </DateTime>
          <Button onClick={onDelete} variant="secondary">
            Delete
          </Button>
        </ImageDetails>
      </ImageBookmarkWrapper>
    </Padding>
  );
};

const GalleryPage = (props) => {
  const [listSize, setListSize] = useState(10);

  const { actions, bookmarks } = props;

  useEffect(() => {
    const _onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 600 &&
        bookmarks.length
      ) {
        setListSize(listSize + 10);
      }
    };

    const onScroll = throttle(_onScroll, 250);

    window.addEventListener('scroll', onScroll, false);

    return () => window.removeEventListener('scroll', onScroll, false);
  }, [bookmarks.length, listSize]);

  useEffect(() => {
    actions.fetchBookmarks();
  }, [actions]);

  const sublist = bookmarks.slice(0, listSize);

  return (
    <Page>
      {sublist.map((bookmark) => (
        <ImageBookmark
          key={bookmark._id}
          bookmark={bookmark}
          onDelete={() => actions.deleteBookmark(bookmark._id)}
        />
      ))}
    </Page>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPage);
