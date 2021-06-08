const Bookmark = require('../../models/bookmark');

// only returns a mongoose query, pending exec
const getPushbulletBookmarksQuery = queryParams => {
  let { singleRecord = false } = queryParams;
  let rest = queryParams;
  delete rest.singleRecord;

  return singleRecord
    ? Bookmark.findOne(
        Object.assign({}, rest, {
          provider: 'pushbullet',
        }),
      )
    : Bookmark.find(
        Object.assign({}, rest, {
          provider: 'pushbullet',
        }),
      );
};

module.exports = {
  getPushbulletBookmarksQuery,
};
