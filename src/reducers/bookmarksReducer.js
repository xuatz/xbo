import _ from 'lodash';

import fromEntries from '../utils/fromEntries';

const initialState = {
  bookmarks: {
    entities: {},
    result: []
  },
  uncategorised: [],
  sublists: {
    link: [],
    note: [],
    file: [],
    gallery: []
  },
  stats: {
    groupByDomain: {},
    groupByHashtag: {}
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'BOOKMARKS_REMOVE_BY_ID': {
      return {
        ...state,
        bookmarks: state.bookmarks.result.filter(id => id !== action.id),
        uncategorised: state.categories.result.filter(id => id !== action.id),
        sublist: {
          link: state.sublist.link.result.filter(id => id !== action.id),
          note: state.sublist.note.result.filter(id => id !== action.id),
          file: state.sublist.file.result.filter(id => id !== action.id),
          gallery: state.sublist.gallery.result.filter(id => id !== action.id)
        },
        categories: {
          groupByDomain: fromEntries(
            Object.entries(state.categories.groupByDomain).map(
              ([key, value]) => {
                return [key, value.filter(id => id !== action.id)];
              }
            )
          ),
          groupByHashtag: fromEntries(
            Object.entries(state.categories.groupByHashtag).map(
              ([key, value]) => {
                return [key, value.filter(id => id !== action.id)];
              }
            )
          )
        }
      };
    }
    case 'BOOKMARKS_UNCATEGORISED_REPLACE': {
      let { entities, result } = action.uncategorised.reduce(
        (res, bk) => {
          res.entities[bk._id] = bk;
          res.result.push(bk._id);
          return res;
        },
        { entities: {}, result: [] }
      );
      return {
        ...state,
        bookmarks: {
          ...state.bookmarks,
          entities: {
            ...state.bookmarks.entities,
            ...entities
          }
        },
        uncategorised: result
      };
    }
    case 'BOOKMARKS_REPLACE': {
      let all = action.bookmarks || state.bookmarks;
      all.sort((a, b) => {
        return b.data.modified - a.data.modified;
      });

      let bookmarks = all.reduce(
        ({ entities, result }, bookmark) => {
          entities[bookmark._id] = bookmark;
          result.push(bookmark._id);
          return { entities, result };
        },
        { entities: {}, result: [] }
      );

      let sublists = {
        link: [],
        note: [],
        file: [],
        gallery: []
      };
      all.forEach(bk => {
        if (!sublists[bk.data.type]) {
          sublists[bk.data.type] = [];
        }
        sublists[bk.data.type].push(bk._id);
        return bk;
      });

      if (sublists.file) {
        sublists.gallery = sublists.file.filter(id => {
          return bookmarks.entities[id].data.image_url ? true : false;
        });
      }

      return {
        ...state,
        bookmarks,
        sublists,
        stats: {
          ...state.stats,
          groupByHashtag: groupByHashtag(all),
          groupByDomain: groupByDomain(all)
        }
      };
    }
    case 'BOOKMARK_REPLACE': {
      let bookmark = action.bookmark;
      return {
        ...state,
        bookmarks: {
          ...state.bookmarks,
          entities: {
            ...state.bookmarks.entities,
            [bookmark._id]: bookmark
          }
        }
      };
    }
    default:
      return state;
  }
};

// const initialState = {
//   bookmarks: [],
//   uncategorised: []
// };

const groupByDomain = bookmarks => {
  let tmp = _.groupBy(bookmarks, bk => bk.stats && bk.stats.domain);

  let domains = {};
  _.forIn(tmp, (value, key) => {
    if (key !== 'undefined') {
      domains[key] = value.map(bk => {
        return bk._id;
      });
    }
  });

  return domains;
};

const groupByHashtag = bookmarks => {
  const hashtags = ['guide', 'todo'];

  let tmp = {};

  bookmarks.map((bk, index) => {
    let { body } = bk.data;

    if (body) {
      hashtags.map(hashtag => {
        if (body.toLowerCase().indexOf('#' + hashtag) !== -1) {
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

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case 'BOOKMARKS_REMOVE_BY_ID': {
//       return {
//         ...state,
//         ...bookmarksReplace(
//           {
//             ...state,
//             bookmarks: state.bookmarks.filter(bk => {
//               return bk._id !== action.id;
//             })
//           },
//           action
//         ),
//         uncategorised: state.uncategorised.filter(bk => {
//           return bk._id !== action.id;
//         })
//       };
//     }
//     case 'BOOKMARKS_UNCATEGORISED_REPLACE': {
//       return {
//         ...state,
//         uncategorised: action.uncategorised
//       };
//     }
//     case 'BOOKMARKS_REPLACE':
//       return bookmarksReplace(state, action);
//     case 'BOOKMARKS_GROUP_BY_DOMAIN':
//       return {
//         ...state,
//         stats: {
//           ...state.stats,
//           groupByDomain: groupByDomain(state.bookmarks)
//         }
//       };
//     case 'BOOKMARKS_GROUP_BY_HASHTAG':
//       return {
//         ...state,
//         stats: {
//           ...state.stats,
//           groupByHashtag: groupByHashtag(state.bookmarks)
//         }
//       };
//     default:
//       return state;
//   }
// };

// const bookmarksReplace = (state, action) => {
//   let all = action.bookmarks || state.bookmarks;

//   let sublists = {};
//   all = all
//     .sort((a, b) => {
//       return b.data.modified - a.data.modified;
//     })
//     .map(bk => {
//       if (!sublists[bk.data.type]) {
//         sublists[bk.data.type] = [];
//       }
//       sublists[bk.data.type].push(bk);
//       return bk;
//     });

//   if (sublists && sublists.file) {
//     sublists.gallery = [].concat(
//       sublists.file.filter(item => {
//         return item.data.image_url ? true : false;
//       })
//     );
//   }

//   return {
//     ...state,
//     bookmarks: all,
//     sublists: sublists,
//     stats: {
//       ...state.stats,
//       groupByHashtag: groupByHashtag(state.bookmarks),
//       groupByDomain: groupByDomain(state.bookmarks)
//     }
//   };
// };
