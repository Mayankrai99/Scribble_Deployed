import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPropertyDetailsComponent } from './view-property-details.component';
import { HousingService } from '../../../services/housing.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { of } from 'rxjs';
import { Article, Comment, Reply } from '../../../common/article';
import { IArticleBase } from '../../../common/IPropertyBase';
import { RouterTestingModule } from '@angular/router/testing';

describe('ViewPropertyDetailsComponent', () => {
  let component: ViewPropertyDetailsComponent;
  let fixture: ComponentFixture<ViewPropertyDetailsComponent>;
  let housingService: jasmine.SpyObj<HousingService>;
  let authService: jasmine.SpyObj<AuthService>;

  const mockArticle: IArticleBase = {
    id: 1,
    name: 'Test Article',
    
  };

  beforeEach(() => {
    const housingServiceSpy = jasmine.createSpyObj('HousingService', [
      'getArticleById',
      'updateArticles',
    ]);
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getLoggedInUser',
      'getLoggedInUserId',
    ]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ViewPropertyDetailsComponent],
      providers: [
        { provide: HousingService, useValue: housingServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: '1' } }, params: of({ id: '1' }) },
        },
      ],
    });

    fixture = TestBed.createComponent(ViewPropertyDetailsComponent);
    component = fixture.componentInstance;
    housingService = TestBed.inject(HousingService) as jasmine.SpyObj<HousingService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    // Mocking the auth service
    authService.getLoggedInUser.and.returnValue('testUser');
    authService.getLoggedInUserId.and.returnValue(1);

    // Mocking the housing service to return a mock article
    housingService.getArticleById.and.returnValue(of(mockArticle));
    //housingService.updateArticles.and.returnValue(of(mockArticle));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the article on initialization', () => {
    component.ngOnInit();
    expect(component.article.name).toBe('Test Article');
    //expect(component.article.description).toBe('Test description');
  });

  it('should add a comment successfully', () => {
    const newCommentText = 'This is a new comment';
    component.newCommentText = newCommentText;

    component.addComment();

    expect(component.article.comments.length).toBe(1);
    expect(component.article.comments[0].text).toBe(newCommentText);
    expect(housingService.updateArticles).toHaveBeenCalled();
  });

  it('should add a reply to a comment successfully', () => {
    const newCommentText = 'This is a comment';
    component.newCommentText = newCommentText;
    component.addComment(); // Adding the comment first

    const newReplyText = 'This is a reply';
    component.newReplyText[1] = newReplyText; // Using the commentId 1

    component.addReply(1); // Adding reply to the comment

    expect(component.article.comments[0].replies.length).toBe(1);
    expect(component.article.comments[0].replies[0].text).toBe(newReplyText);
    expect(housingService.updateArticles).toHaveBeenCalled();
  });

  it('should handle undefined article response gracefully', () => {
    housingService.getArticleById.and.returnValue(of(undefined));
    component.ngOnInit();
    expect(component.article).toEqual(new Article());
  });

  it('should correctly assign current user details', () => {
    expect(component.currentUserName).toBe('testUser');
    expect(component.currentUserId).toBe(1);
  });

  it('should handle comment text properly on addComment call', () => {
    component.newCommentText = 'New Comment';
    component.addComment();
    expect(component.newCommentText).toBe('');
  });

  it('should clear reply text after adding a reply', () => {
    const commentId = 1;
    component.newReplyText[commentId] = 'New Reply';
    component.addReply(commentId);
    expect(component.newReplyText[commentId]).toBe('');
  });
});
