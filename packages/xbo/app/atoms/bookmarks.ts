import { atom } from 'jotai';
import { Bookmark } from '~/types';
import { mockBookmarks } from '../routes/mocks';

export const selectedListAtom = atom<string>('all');
export const searchTextAtom = atom<string>('');

// Derived atom for filtered bookmarks
export const filteredBookmarksAtom = atom<Bookmark[]>((get) => {
  const searchText = get(searchTextAtom);
  const selectedList = get(selectedListAtom);
  
  let filtered = [...mockBookmarks];
  
  // First filter by selected list
  if (selectedList !== 'all') {
    // Simulating different lists with different filtering logic
    switch (selectedList) {
      case 'recent':
        filtered = filtered.slice(-2); // Show last 2 items
        break;
      case 'favorites':
        filtered = filtered.filter(b => b.type === 'link'); // Show only links
        break;
      case 'archived':
        filtered = filtered.filter(b => b.type === 'text'); // Show only text
        break;
      case 'shared':
        filtered = filtered.filter(b => b.origin === 'youtube'); // Show only youtube
        break;
      case 'unread':
        filtered = filtered.slice(0, 2); // Show first 2 items
        break;
    }
  }
  
  // Then filter by search text
  if (searchText) {
    const searchLower = searchText.toLowerCase();
    filtered = filtered.filter((bookmark) => {
      return (
        bookmark.title.toLowerCase().includes(searchLower) ||
        (bookmark.url && bookmark.url.toLowerCase().includes(searchLower)) ||
        (bookmark.content && bookmark.content.toLowerCase().includes(searchLower)) ||
        bookmark.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    });
  }
  
  return filtered;
});
