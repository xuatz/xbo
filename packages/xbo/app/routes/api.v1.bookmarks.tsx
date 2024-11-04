import { pullFromPushbullet } from '~/services/pb.server';
import { json } from '@remix-run/node';

import type { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const success = await pullFromPushbullet(request);
    return json({ status: success ? 200 : 500 });
  } catch (error) {
    throw new Error(
      `Failed to fetch pushes: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};
