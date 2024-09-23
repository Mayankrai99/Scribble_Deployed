export interface Comment {
  id?: number;
  articleId?: number;
  author: string;
  text: string;
  userId: number;
  parentId?: number;
  timestamp: Date;
}
