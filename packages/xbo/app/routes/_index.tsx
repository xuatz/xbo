export default function MyRouteComponent() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Welcome to SavedItems
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Access all your saved items in one place
        </p>
        <div className="space-y-4">
          <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
            Login with GitHub
          </button>
          <button className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
            Login with Gmail
          </button>
        </div>
      </div>
    </div>
  );
}
