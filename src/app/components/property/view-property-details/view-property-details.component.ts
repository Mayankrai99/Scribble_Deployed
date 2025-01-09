import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../../../services/housing.service';
import { Property } from '../../../common/property';
import { IArticleBase } from '../../../common/IPropertyBase';
import { Article, Comment, Reply } from '../../../common/article';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-view-property-details',
  templateUrl: './view-property-details.component.html',
  styleUrls: ['./view-property-details.component.css'],
})
export class ViewPropertyDetailsComponent implements OnInit {
  public propertyId!: number;
  public articleId!: number;

  property = new Property();
  article = new Article();
  
  newCommentText: string = '';
  newReplyText: {[key:number]: string} = {};

  currentUserName: string | null = null;
  currentUserId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService,
    private authServ: AuthService
  ) {}

  ngOnInit() {
    this.articleId = this.route.snapshot.params['id'];

    this.currentUserName = this.authServ.getLoggedInUser();
    this.currentUserId = this.authServ.getLoggedInUserId();

    this.route.params.subscribe((params) => {
      this.articleId = +params['id'];
      this.housingService
        .getArticleById(this.articleId)
        .subscribe((res: IArticleBase | undefined) => {
          if (res) {
            this.article = res as Article
            
          } else {
            // Handle the case where the property is not found or is undefined
            console.error('Property not found');
          }
        });
    });
  }


  //Add comment
  addComment() {


    const newComment: Comment = {
      comment_id: this.article.comments.length + 1,
      user_id: this.currentUserId,
      username: this.currentUserName,
      text: this.newCommentText,
      replies: []
    };

    //pushing new comments to article array
    this.article.comments.push(newComment);
    //this.newCommentText = '';

    //updating article in local storage
    this.housingService.updateArticles(this.articleId, this.article);
    this.newCommentText = '';

  }

  //add reply
  addReply(commentId: number) {
    const comment = this.article.comments.find(c => c.comment_id === commentId);


    if(comment) {
      const newReply: Reply = {
        reply_id: comment.replies.length+1,
        user_id: this.currentUserId,
        username: this.currentUserName,
        text: this.newReplyText[commentId]      
      };

      //pushing new replies in article array
      comment.replies.push(newReply);
      this.newReplyText[commentId] = '';

      //update the article in local storage
      this.housingService.updateArticles(this.articleId, this.article);
    }
  }

}
