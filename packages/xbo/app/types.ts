export type Bookmark = {
  id: number;
  title: string;
  url?: string;
  content?: string;
  type: 'link' | 'video' | 'text' | 'image';
  origin: string;
  tags: string[];
};
