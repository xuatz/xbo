import _ from "lodash";

const groupByDomain = bookmarks => {
  let tmp = _.groupBy(bookmarks, bk => bk.stats && bk.stats.domain);

  let domains = [];
  _.forIn(tmp, (value, key) => {
    if (key !== "undefined") {
      domains.push({
        domain: key,
        bookmarks: value.map(bk => {
          return bk._id;
        })
      });
    }
  });

  return domains;
};

const groupByHashtag = bookmarks => {
  const hashtags = ["guide", "todo"];

  let tmp = {};

  bookmarks.map((bk, index) => {
    let { body } = bk.data;

    if (body) {
      hashtags.map(hashtag => {
        if (body.toLowerCase().indexOf("#" + hashtag) !== -1) {
          if (!tmp[hashtag]) {
            tmp[hashtag] = [];
          }
          tmp[hashtag].push(bk._id);
        }
        return true;
      });
    }

    return true;
  });
  return tmp;
};

const initialState = {
  bookmarks: [],
  uncategorised: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "BOOKMARKS_REMOVE_BY_ID": {
      return {
        ...state,
        ...bookmarksReplace(
          {
            ...state,
            bookmarks: state.bookmarks.filter(bk => {
              return bk._id !== action.id;
            })
          },
          action
        ),
        uncategorised: state.uncategorised.filter(bk => {
          return bk._id !== action.id;
        })
      };
    }
    case "BOOKMARKS_UNCATEGORISED_REPLACE": {
      return {
        ...state,
        uncategorised: action.uncategorised
      };
    }
    case "BOOKMARKS_REPLACE":
      return bookmarksReplace(state, action);
    case "BOOKMARKS_GROUP_BY_DOMAIN":
      return {
        ...state,
        stats: {
          ...state.stats,
          groupByDomain: groupByDomain(state.bookmarks)
        }
      };
    case "BOOKMARKS_GROUP_BY_HASHTAG":
      return {
        ...state,
        stats: {
          ...state.stats,
          groupByHashtag: groupByHashtag(state.bookmarks)
        }
      };
    default:
      return state;
  }
};

const bookmarksReplace = (state, action) => {
  let all = action.bookmarks || state.bookmarks;

  let sublists = {};
  all = all
    .sort((a, b) => {
      return b.data.modified - a.data.modified;
    })
    .map(bk => {
      if (!sublists[bk.data.type]) {
        sublists[bk.data.type] = [];
      }
      sublists[bk.data.type].push(bk);
      return bk;
    });

  if (sublists && sublists.file) {
    sublists.gallery = [].concat(
      sublists.file.filter(item => {
        return item.data.image_url ? true : false;
      })
    );
  }

  return {
    ...state,
    bookmarks: all,
    sublists: sublists,
    stats: {
      ...state.stats,
      groupByHashtag: groupByHashtag(state.bookmarks),
      groupByDomain: groupByDomain(state.bookmarks)
    }
  };
};
