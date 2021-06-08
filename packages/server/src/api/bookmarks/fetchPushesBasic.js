const axios = require('axios');

const PB_API = axios.create({
  baseURL: 'https://api.pushbullet.com/v2/',
});

const fetchPushesBasic = params => {
  const demoLimit = 2;

  let {
    access_token,
    cursor = null,
    pushes = [],
    modified_after = null,
    count = 1,
  } = params;

  console.log('fetchPushesBasic():count:', count);
  console.log('cursor:', cursor);
  console.log('modified_after:', modified_after);

  return PB_API.request({
    url: '/pushes',
    headers: {
      'Access-Token': access_token,
    },
    params: {
      active: true,
      cursor,
      modified_after,
      limit: 500,
    },
  })
    .then(res => {
      let { status, statusText, data } = res;
      let newPushes = data.pushes;
      let nextCursor = data.cursor;

      console.log('newPushes.length', newPushes.length);

      let mergedPushes = pushes.concat(newPushes);

      // if (nextCursor && count < demoLimit) {
      if (nextCursor) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            fetchPushesBasic({
              access_token,
              cursor: nextCursor,
              pushes: mergedPushes,
              count: ++count,
              modified_after,
            })
              .then(resolve)
              .catch(reject);
          }, 10000);
        });
      } else {
        return mergedPushes;
      }
    })
    .catch(err => {
      throw err;
    });
};

module.exports = {
  fetchPushesBasic,
};
