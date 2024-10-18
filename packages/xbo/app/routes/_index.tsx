import { authenticator } from '~/services/auth.server';
import { LoaderFunctionArgs } from '@remix-run/node';
import { Link } from '@remix-run/react';

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to xbo</h1>
      <p className="text-xl mb-6">Your personal dashboard for saved items</p>
      <Link to="/items" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        View Saved Items (not implemented yet)
      </Link>
    </div>
  );
}
