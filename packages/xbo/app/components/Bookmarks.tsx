import { useAtom } from 'jotai';
import { filteredBookmarksAtom, searchTextAtom } from '../atoms/bookmarks';

const Bookmarks = () => {
  const [filteredBookmarks] = useAtom(filteredBookmarksAtom);
  const [searchText] = useAtom(searchTextAtom);

  return (
    <div className="space-y-4">
      {filteredBookmarks.length === 0 ? (
        <div className="rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500">
            No bookmarks found{searchText ? ` matching "${searchText}"` : ''}.
          </p>
        </div>
      ) : (
        filteredBookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="rounded-lg border border-gray-200 p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {bookmark.title}
                </h3>
                {bookmark.url && (
                  <a
                    href={bookmark.url}
                    className="text-sm text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {bookmark.url}
                  </a>
                )}
                {bookmark.content && (
                  <p className="mt-1 text-sm text-gray-600">
                    {bookmark.content}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded px-2 py-1 text-xs font-medium ${
                    bookmark.type === 'link'
                      ? 'bg-blue-100 text-blue-700'
                      : bookmark.type === 'video'
                      ? 'bg-red-100 text-red-700'
                      : bookmark.type === 'text'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}
                >
                  {bookmark.type}
                </span>
                <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                  {bookmark.origin}
                </span>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {bookmark.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Bookmarks;
