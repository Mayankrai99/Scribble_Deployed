import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HousingService } from './housing.service';
import { IPropertyBase } from '../common/IPropertyBase';
import { Article } from '../common/article';
import { IArticleBase } from '../common/IPropertyBase';
import { comment } from '../common/comment';
import { of } from 'rxjs';

describe('HousingService', () => {
  let service: HousingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HousingService]
    });
    service = TestBed.inject(HousingService);
    httpMock = TestBed.inject(HttpTestingController);
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('getAllProperties', () => {
    it('should fetch properties from the API and localStorage', () => {
      const mockProperties: IPropertyBase[] = [
        { id: 1, name: 'Property 1', propertyType: 'Apartment', price: 5000000, fType: 'Furnished', bhk: 3, builtArea: 1500, city: 'City A', readyToMove: true, security: 3, maintenance: 1500, carpetArea: 1200, floor: 2, totalFloor: 10, address: 'Address 1', landmark: 'Landmark 1', possessionDate: new Date(), ageOfProperty: 5, gatedCommunity: 1 }
      ];

      // Simulate localStorage data
      localStorage.setItem('newProperty', JSON.stringify([mockProperties[0]]));

      service.getAllProperties().subscribe((properties) => {
        expect(properties.length).toBe(2); // 1 from API + 1 from localStorage
        expect(properties[0]).toEqual(mockProperties[0]); // The property from localStorage should be first
      });

      const req = httpMock.expectOne('assets/data/properties.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockProperties);
    });
  });

  describe('getAllArticles', () => {
    it('should fetch articles from the API and localStorage', () => {
      const mockArticles: IArticleBase[] = [
        { id: 1, name: 'Article 1' }
      ];

      // Simulate localStorage data
      localStorage.setItem('newArticle', JSON.stringify([mockArticles[0]]));

      service.getAllArticles().subscribe((articles) => {
        expect(articles.length).toBe(2); // 1 from API + 1 from localStorage
        expect(articles[0]).toEqual(mockArticles[0]); // The article from localStorage should be first
      });

      const req = httpMock.expectOne('assets/data/articles.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockArticles);
    });
  });

  // describe('addProperty', () => {
  //   it('should add a new property to localStorage', () => {
  //     const property = {
  //       id: 101,
  //       name: 'New Property',
  //       propertyType: 'Villa',
  //       price: 10000000,
  //       fType: 'Semi-Furnished',
  //       bhk: 4,
  //       builtArea: 2500,
  //       city: 'City B',
  //       readyToMove: true,
  //       security: 5,
  //       maintenance: 3000,
  //       carpetArea: 2000,
  //       floor: 1,
  //       totalFloor: 3,
  //       address: 'Address 2',
  //       landmark: 'Landmark 2',
  //       possessionDate: new Date(),
  //       ageOfProperty: 2,
  //       gatedCommunity: 1
  //     };

  //     service.addProperty(property);

  //     const storedProperties = localStorage.getItem('newProperty');
  //     const parsedProperties = JSON.parse(storedProperties!);
  //     expect(parsedProperties.length).toBe(1);
  //     expect(parsedProperties[0]).toEqual(property);
  //   });
  // });

  // describe('addArticle', () => {
  //   it('should add a new article to localStorage', () => {
  //     const article: Article = {
  //       id: 101,
  //       name: 'New Article',
  //       description: 'Description of new article',
  //       comments: []
  //     };

  //     service.addArticle(article);

  //     const storedArticles = localStorage.getItem('newArticle');
  //     const parsedArticles = JSON.parse(storedArticles!);
  //     expect(parsedArticles.length).toBe(1);
  //     expect(parsedArticles[0]).toEqual(article);
  //   });
  // });

  describe('newPropertyId', () => {
    it('should generate a new unique property ID', () => {
      const newPropertyId = service.newPropertyId();
      expect(newPropertyId).toBe(101);

      const nextPropertyId = service.newPropertyId();
      expect(nextPropertyId).toBe(102);
    });
  });

  describe('newArticleId', () => {
    it('should generate a new unique article ID', () => {
      const newArticleId = service.newArticleId();
      expect(newArticleId).toBe(101);

      const nextArticleId = service.newArticleId();
      expect(nextArticleId).toBe(102);
    });
  });

  describe('getPropertyById', () => {
    it('should return the property with the specified ID', () => {
      const mockProperty: IPropertyBase = {
        id: 1,
        name: 'Property 1',
        propertyType: 'Apartment',
        price: 5000000,
        fType: 'Furnished',
        bhk: 3,
        builtArea: 1500,
        city: 'City A',
        readyToMove: true,
        security: 3,
        maintenance: 1500,
        carpetArea: 1200,
        floor: 2,
        totalFloor: 10,
        address: 'Address 1',
        landmark: 'Landmark 1',
        possessionDate: new Date(),
        ageOfProperty: 5,
        gatedCommunity: 1
      };

      service.getAllProperties = jasmine.createSpy().and.returnValue(of([mockProperty]));

      service.getPropertyById(1).subscribe((property) => {
        expect(property).toEqual(mockProperty);
      });
    });
  });

  describe('getArticleById', () => {
    it('should return the article with the specified ID', () => {
      const mockArticle: IArticleBase = { id: 1, name: 'Article 1' };

      service.getAllArticles = jasmine.createSpy().and.returnValue(of([mockArticle]));

      service.getArticleById(1).subscribe((article) => {
        expect(article).toEqual(mockArticle);
      });
    });
  });

  // describe('getCommentsByArticleId', () => {
  //   it('should return comments for a specific article ID', () => {
  //     const commentData: comment[] = [
  //       { articleId: 1, commentText: 'Great article!' }
  //     ];

  //     service.getCommentsByArticleId(1).subscribe((comments) => {
  //       expect(comments).toEqual(commentData);
  //     });
  //   });
  // });

  // describe('addComment', () => {
  //   it('should add a comment to the comments array', () => {
  //     const newComment: comment = { articleId: 1, commentText: 'Interesting article!' };

  //     service.addComment(newComment).subscribe((comment) => {
  //       expect(comment).toEqual(newComment);
  //     });
  //   });
  // });

  afterEach(() => {
    httpMock.verify();
  });
});