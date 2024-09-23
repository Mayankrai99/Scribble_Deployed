import { IArticleBase, IPropertyBase } from './IPropertyBase';
import {AngularEditorConfig} from '@kolkov/angular-editor';

export interface IProperty extends IPropertyBase {
  Description: string;
}

export interface IArticle extends IArticleBase {
  description: AngularEditorConfig;
}
