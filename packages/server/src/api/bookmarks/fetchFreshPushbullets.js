const ObjectId = require('mongoose').Types.ObjectId;
const Bookmark = require('../../models/bookmark');
const {
  getPushbulletBookmarksQuery,
} = require('./getPushbulletBookmarksQuery');
const { fetchPushesBasic } = require('./fetchPushesBasic');

let isFetchingFreshPushbullets = false;
async function fetchFreshPushbullets(params) {
  console.log('fetchFreshPushbullets()');
  console.log('isFetchingFreshPushbullets', isFetchingFreshPushbullets);
  if (isFetchingFreshPushbullets) {
    const error = new Error('fetchFreshPushbullets() is already running');
    error.code = 1001;
    throw error;
  }

  try {
    isFetchingFreshPushbullets = true;

    let { userId, access_token, rebuild = false } = params;

    const lastModifiedPush = await getPushbulletBookmarksQuery({
      userId: new ObjectId(userId),
      singleRecord: true,
    })
      .sort({ 'data.modified': -1 }) //SORT DESC
      .exec();

    const newPushes = await fetchPushesBasic({
      access_token,
      modified_after:
        rebuild || !lastModifiedPush ? null : lastModifiedPush.data.modified,
    });

    console.log(
      'fetchPushesBasic is complete: newPushes.length:',
      newPushes.length,
    );

    if (newPushes && newPushes.length > 0) {
      return Promise.map(newPushes, newPush => {
        //TODO xz: ideally should also check if modified is < newPush.modified
        return Bookmark.findOneAndUpdate(
          {
            provider: 'pushbullet',
            'data.iden': newPush.iden,
          },
          {
            $set: {
              userId: new ObjectId(userId),
              data: newPush,
            },
          },
          {
            upsert: true,
          },
        ).exec();
      });
    }
  } catch (err) {
    isFetchingFreshPushbullets = false;
    throw err;
  } finally {
    isFetchingFreshPushbullets = false;
    // setTimeout(function() {
    //   isFetchingFreshPushbullets = false;
    // }, 5000);
  }
}

module.exports = {
  fetchFreshPushbullets,
};
