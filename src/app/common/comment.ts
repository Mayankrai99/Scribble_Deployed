export class comment {
  id!: number;
  articleId!: number;
  text!: string;
  userId!: number;
  parentId?: number;
  timestamp!: Date;
}
