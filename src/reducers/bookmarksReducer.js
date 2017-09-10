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
                uncategorised: state.uncategorised.filter(bk => {
                    return bk._id !== action.id;
                }),
                bookmarks: state.bookmarks.filter(bk => {
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
            return {
                ...state,
                bookmarks: action.bookmarks || state.bookmarks
            };
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
