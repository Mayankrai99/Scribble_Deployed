import { Component, OnInit, ChangeDetectorRef, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../../../services/housing.service';
import { Property } from '../../../common/property';
import { IArticleBase } from '../../../common/IPropertyBase';
import { Article, Comment, Reply } from '../../../common/article';
import { AuthService } from '../../../services/auth.service';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-property-details',
  templateUrl: './view-property-details.component.html',
  styleUrls: ['./view-property-details.component.css'],
})
export class ViewPropertyDetailsComponent implements OnInit, AfterViewInit {
  public propertyId!: number;
  public articleId!: number;

  property = new Property();
  article = new Article();

  articles: any[]=[];

  authorIdForRelated = new Article();
  relatedArticles: any[]=[];
  
  newCommentText: string = '';
  newReplyText: {[key:number]: string} = {};

  currentUserName: string | null = null;
  currentUserId: number | null = null;

  commentText: { [key: number]: string } = {};
  replyText: { [key: number]: string } = {};
  showReplyForm: { [key: number]: boolean } = {};

  showReplyReplyForm: { [key: number]: boolean } = {};

  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService,
    private authServ: AuthService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.articleId = this.route.snapshot.params['id'];
    

    this.currentUserName = this.authServ.getLoggedInUser();
    this.currentUserId = this.authServ.getLoggedInUserId();

    this.loadallarticles();
    //this.articles = this.housingService.getAllArticles();

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

  ngAfterViewInit() {
    new Swiper('.mySwiper', {
      slidesPerView: 3,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      modules: [Pagination],
    } as SwiperOptions);
  }

  loadallarticles() {
    const storedData = localStorage.getItem('newArticle');
    this.articles = storedData ? JSON.parse(storedData).filter((a: any) => a !== null) : [];

    this.authorIdForRelated = this.articles.find((a)=> a.id == this.articleId);
    
    this.relatedArticles = this.articles.filter((i) => (i.name.toLowerCase().includes(this.authorIdForRelated.name) || i.authorId === this.authorIdForRelated.authorId) && i.id != this.articleId);


  }

  // Toggle reply form visibility
  toggleReplyForm(commentId: number) {
    this.showReplyForm[commentId] = !this.showReplyForm[commentId];
    //this.showReplyReplyForm[commentId] = false;
  }

  toggleReplyReplyForm(replyId: number) {
    this.showReplyReplyForm[replyId] = !this.showReplyReplyForm[replyId];
    //this.showReplyForm[commentId] = false;
  }


  //Add comment
  addComment(articleId: number) {

    if (this.commentText[articleId]?.trim()) {

      const newComment: Comment = {
        comment_id: new Date().getTime(),
        user_id: this.currentUserId,
        username: this.currentUserName,
        text: this.commentText[articleId],
        replies: []
      };

      const article = this.articles.find((a)=>a.id === articleId);

      if (article) {

        //pushing new comments to article array
        article.comments = article.comments || [];
        article.comments.push(newComment);
        this.saveArticles();
        this.commentText[articleId] = '';

        
        this.cdRef.detectChanges();

        //updating article in local storage
        //this.housingService.updateArticles(this.articleId, this.article);
        //this.newCommentText = '';
      }
    }

  }

  //delete comment
  deleteComment(articleId: number, commentId: number, commentUserId: number | null) {
    const article = this.articles.find((a) => a.id === articleId);
    if (article && commentUserId==this.currentUserId) {
      article.comments = article.comments.filter((comment: { comment_id: number; }) => comment.comment_id !== commentId);

      this.saveArticles();

    }
    else {
      alert('You can only delete your own comment');
    }
    


  }

  deleteReply(articleId: number, commentId: number, replyId: number, replyUserId: number | null) {
    const article = this.articles.find((a) => a.id === articleId);
    const comment = article.comments.find((c: { comment_id: number; }) => c.comment_id === commentId);
    if (article && replyUserId == this.currentUserId) {
      comment.replies = comment.replies.filter((reply: { reply_id: number; }) => reply.reply_id != replyId);
      

      this.saveArticles();

    }
    else
    {
      alert('You can only delete your own reply');
    }
    

  }

  //add reply
  addReply(articleId: number, commentId: number, commentUser: string | null) {

    if(this.replyText[commentId]?.trim()) {
      const newReply: Reply = {
        reply_id: new Date().getTime(),
        user_id: this.currentUserId,
        username: this.currentUserName,
        text: this.replyText[commentId]      
      };


      const article = this.articles.find((a) => a.id === articleId);
      if (article) {
        const comment = article.comments.find((c: { comment_id: number; }) => c.comment_id === commentId);
        if (comment) {
          comment.replies = comment.replies || [];
          comment.replies.push(newReply);
          this.saveArticles();
          this.replyText[commentId] = '';
          this.showReplyForm[commentId] = false;
          this.cdRef.detectChanges();
        }

      }

      
    }
    //const finalarticles = this.loadallarticles();
  }

  // Save articles back to local storage
  saveArticles() {
    if (this.articles && this.articles.length > 0) {
      localStorage.setItem('newArticle', JSON.stringify(this.articles));
    }    
  }

}
