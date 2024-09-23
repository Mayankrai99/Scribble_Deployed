import { IArticleBase } from './IPropertyBase';
import {AngularEditorConfig} from '@kolkov/angular-editor';

export interface Reply {
  reply_id: number;
  user_id: number | null;
  username: string | null;
  text: string;
}

export interface Comment {
  comment_id: number;
  user_id: number | null;
  username: string | null;
  text: string;
  replies: Reply[];
}

export class Article implements IArticleBase {
  id!: number;
  name!: string;
  description!: AngularEditorConfig;
  comments!: Comment[];
}
