import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { IArticleBase, IPropertyBase } from '../common/IPropertyBase';
import { Property } from '../common/property';
import { Article } from '../common/article';
import { comment } from '../common/comment';

@Injectable({
  providedIn: 'root',
})
export class HousingService {

  private comments: comment[] = [];
  constructor(private http: HttpClient) {}

  getAllProperties(): Observable<IPropertyBase[]> {
    return this.http.get<IPropertyBase[]>('assets/data/properties.json').pipe(
      map((res) => {
        const propertiesList: Array<IPropertyBase> = [];

        // Check if localStorage is available
        if (
          typeof window !== 'undefined' &&
          typeof localStorage !== 'undefined'
        ) {
          let localAddedProperties: { [key: string]: IPropertyBase } = {};
          try {
            const storedData = localStorage.getItem('newProperty');
            if (storedData) {
              localAddedProperties = JSON.parse(storedData);
            }
          } catch (error) {
            console.error('Error parsing local storage data', error);
          }

          // Add local properties to the list
          for (const id in localAddedProperties) {
            if (localAddedProperties.hasOwnProperty(id)) {
              propertiesList.push(localAddedProperties[id]);
            }
          }
        }

        // Add properties from the HTTP response to the list
        for (const id in res) {
          if (res.hasOwnProperty(id)) {
            propertiesList.push(res[id]);
          }
        }

        return propertiesList;
      })
    );
  }

  getAllArticles(): Observable<IArticleBase[]> {
    return this.http.get<IArticleBase[]>('assets/data/articles.json').pipe(
      map((res) => {
        const articlesList: Array<IArticleBase> = [];

        // Check if localStorage is available
        if (
          typeof window !== 'undefined' &&
          typeof localStorage !== 'undefined'
        ) {
          let localAddedArticles: { [key: string]: IArticleBase } = {};
          try {
            const storedData = localStorage.getItem('newArticle');
            if (storedData) {
              localAddedArticles = JSON.parse(storedData);
            }
          } catch (error) {
            console.error('Error parsing local storage data', error);
          }

          // Add local properties to the list
          for (const id in localAddedArticles) {
            if (localAddedArticles.hasOwnProperty(id)) {
              articlesList.push(localAddedArticles[id]);
            }
          }
        }

        // Add properties from the HTTP response to the list
        for (const id in res) {
          if (res.hasOwnProperty(id)) {
            articlesList.push(res[id]);
          }
        }

        return articlesList;
      })
    );
  }

  addProperty(property: Property) {
    let newProperty: Property[];

    const existingProperties = localStorage.getItem('newProperty');
    if (existingProperties) {
      newProperty = [property, ...JSON.parse(existingProperties)];
    } else {
      newProperty = [property];
    }

    localStorage.setItem('newProperty', JSON.stringify(newProperty));
  }

  addArticle(article: Article) {
    let newArticle: Article[];

    const existingArticles = localStorage.getItem('newArticle');
    if (existingArticles) {
      newArticle = [article, ...JSON.parse(existingArticles)];
    }
    else {
      newArticle = [article];
    }

    localStorage.setItem('newArticle', JSON.stringify(newArticle));
  }

  newPropertyId(): number {
    const pid = localStorage.getItem('PID');
    if (pid) {
      // Ensure 'pid' is not null and is a valid number
      const newId = Number(pid) + 1;
      localStorage.setItem('PID', String(newId));
      return newId;
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }

  newArticleId(): number {
    const aid = localStorage.getItem('AID');
    if (aid) {
      const newAid = Number(aid) + 1;
      localStorage.setItem('AID', String(newAid));
      return newAid;
    }
    else {
      localStorage.setItem('AID', '101');
      return 101;
    }
  }

  getPropertyById(id: number) {
    return this.getAllProperties().pipe(
      map((prop) => {
        return prop.find((p) => p.id === id);
      })
    );
  }

  getArticleById(id: number) {
    return this.getAllArticles().pipe(map((art) => {
      return art.find((a) => a.id === id);
    }));
  }

  updateArticles(articleId: number, updatedArticle: IArticleBase): void {
    if(typeof window!== 'undefined' && typeof localStorage!== 'undefined') {
      let localAddedArticles: { [key: string]: IArticleBase } = {};

      //fetch existing articles from local storage
      const storedData = localStorage.getItem('newArticle');
      if(storedData){
        localAddedArticles = JSON.parse(storedData);
      }

      localAddedArticles[articleId] = updatedArticle;

      localStorage.setItem('newArticle', JSON.stringify(localAddedArticles));
    }
  }

  getCommentsByArticleId(articleId: number): Observable<comment[]> {
    return of(this.comments.filter(comment => comment.articleId === articleId));
  }

  addComment(comment: comment): Observable<comment> {
    this.comments.push(comment);
    return of(comment);
  }
}
