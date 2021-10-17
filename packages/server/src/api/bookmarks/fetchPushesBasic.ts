const axios = require('axios')

const PB_API = axios.create({
  baseURL: 'https://api.pushbullet.com/v2/',
});

type IParams = {
  access_token: string;
  cursor?: string;
  pushes?: unknown[];
  modified_after?: string;
  count?: number; // @todo rename to runCount
  emptyCount?: number
};

export const fetchPushesBasic = (params: IParams) => {
  const demoLimit = 2;

  let {
    access_token,
    cursor,
    pushes = [],
    modified_after,
    count = 1,
    emptyCount = 0,
  } = params;

  console.log('fetchPushesBasic():count:', count);
  console.log('cursor:', cursor);
  console.log('modified_after:', modified_after);

  return PB_API.request<{ pushes: unknown[]; cursor: string}>({
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
    .then((res) => {
      let { status, statusText, data } = res;
      let newPushes = data.pushes;
      let nextCursor = data.cursor;

      console.log('newPushes.length', newPushes.length);
      const isCursorResultsEmpty = newPushes.length === 0

      let mergedPushes = pushes.concat(newPushes);

      // if (nextCursor && count < demoLimit) {
      if (nextCursor && emptyCount < 10) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            fetchPushesBasic({
              access_token,
              cursor: nextCursor,
              pushes: mergedPushes,
              count: ++count,
              modified_after,
              ...(isCursorResultsEmpty && {
                emptyCount: emptyCount + 1,
              }),
            })
              .then(resolve)
              .catch(reject);
          }, 10000);
        });
      } else {
        return mergedPushes;
      }
    })
    .catch((err) => {
      throw err;
    });
};
