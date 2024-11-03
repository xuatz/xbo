import { useAtom } from 'jotai';
import { json } from '@remix-run/node';
import { searchTextAtom, selectedListAtom } from '../atoms/bookmarks';
import Bookmarks from '../components/Bookmarks';
import { lists, mockBookmarks } from './mocks';

export const loader = async () => {
  return json({ bookmarks: mockBookmarks });
};

export default function BookmarksPage() {
  const [selectedList, setSelectedList] = useAtom(selectedListAtom);
  const [searchText, setSearchText] = useAtom(searchTextAtom);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* List Selection Pills */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {lists.map((list) => (
          <button
            key={list.value}
            onClick={() => setSelectedList(list.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedList === list.value
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {list.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-4 w-4 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search bookmarks..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {searchText && (
            <button
              onClick={() => setSearchText("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <svg
                className="h-4 w-4 text-gray-400 hover:text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Selected List Indicator */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {lists.find((list) => list.value === selectedList)?.label} Bookmarks
          {searchText && (
            <span className="ml-2 text-base font-normal text-gray-500">
              • Filtered by "{searchText}"
            </span>
          )}
        </h2>
      </div>

      <Bookmarks />
    </div>
  );
}
