import { useMemo } from 'react';
import { Form, Link } from '@remix-run/react';

export default function Login() {
  const client_id: string = import.meta.env.VITE_PUSHBULLET_CLIENT_ID;
  const redirect_uri = encodeURIComponent(
    'http://localhost:5173/auth/pushbullet/callback'
  );

  const pushbulletAuthUrl = `https://www.pushbullet.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Welcome to SavedItems
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Access all your saved items in one place
        </p>
        <Form action="/auth/github" method="post" className="mb-4">
          <button  
            className="w-full bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          >
            Login with GitHub
          </button>
        </Form>
        <Link
          to={pushbulletAuthUrl}
          className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out inline-block text-center"
        >
          Login with Pushbullet
        </Link>
      </div>
    </div>
  );
}
