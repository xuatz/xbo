import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { authenticator } from '../services/auth.server';
import { pb } from '../services/db.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    throw new Error('No code provided');
  }

  const pushbulletApiUrl = 'https://api.pushbullet.com/oauth2/token';
  const clientId = import.meta.env.VITE_PUSHBULLET_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_PUSHBULLET_CLIENT_SECRET;

  try {
    const response = await fetch(pushbulletApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch access token');
    }

    const data = await response.json();

    // Get the current authenticated user
    const authUser = await authenticator.isAuthenticated(request);
    if (!authUser) {
      throw new Error('User not authenticated');
    }

    // Update the user object in Pocketbase
    const updatedUser = await pb.collection('users').update(authUser.id, {
      providers: {
        ...authUser.providers,
        pushbullet: {
          tokens: {
            access_token: data.access_token,
          },
        },
      },
    });

    console.log('User updated with Pushbullet access token:', updatedUser);

    return redirect('/');
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
