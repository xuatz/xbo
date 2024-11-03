import type { Bookmark } from '../types';

// Mock data with different types of bookmarks
export const mockBookmarks: Bookmark[] = [
  {
    id: 1,
    title: "Interesting Article About React",
    url: "https://example.com/react-article",
    type: "link",
    origin: "browser",
    tags: ["tech", "react", "frontend"],
  },
  {
    id: 2,
    title: "Cool Video on Architecture",
    url: "https://youtube.com/watch?v=123",
    type: "video",
    origin: "youtube",
    tags: ["architecture", "design", "education"],
  },
  {
    id: 3,
    title: "Important Note",
    content: "Remember to check out the new API documentation",
    type: "text",
    origin: "pushbullet",
    tags: ["work", "reminder"],
  },
  {
    id: 4,
    title: "Inspiration Design",
    url: "https://example.com/design.jpg",
    type: "image",
    origin: "pinterest",
    tags: ["design", "inspiration"],
  },
];

// Lists for filter pills
export const lists = [
  { label: "All", value: "all" },
  { label: "Recent", value: "recent" },
  { label: "Favorites", value: "favorites" },
  { label: "Archived", value: "archived" },
  { label: "Shared", value: "shared" },
  { label: "Unread", value: "unread" },
];
