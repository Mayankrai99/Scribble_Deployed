import { Component, OnInit } from '@angular/core';
import { IArticleBase } from '../../../common/IPropertyBase';
import { HousingService } from '../../../services/housing.service';
import { User } from '../../../services/auth.service';
import { Article } from '../../../common/article';

@Component({
  selector: 'app-explore-author',
  templateUrl: './explore-author.component.html',
  styleUrl: './explore-author.component.css'
})
export class ExploreAuthorComponent implements OnInit {

  Articles: IArticleBase[] = [];
  filteredArticles: IArticleBase[] = [];

  authorList: User[] = [];

  currentClickedUser: string = '';

  noArticles: boolean = false;

  constructor(private housingService: HousingService) {
    
  }

  ngOnInit(): void {
    this.getUserName();
    this.getArticles();

    setTimeout(() => {
      if (this.authorList.length > 0) {
        const firstAuthor = this.authorList[0];
        this.currentClickedUser = firstAuthor.userName; // Update selected author name
        this.applyAuthorFilter(firstAuthor.id); // Apply filter for first author
      }
    }, 100);

  }

  getUserName() {
    const users = localStorage.getItem('Users');

    const userList: User[] = users ? JSON.parse(users) : [];

    this.authorList = userList;
  }

  getArticles(): void {
    console.log('',)
    this.housingService.getAllArticles().subscribe({
      next: (response: IArticleBase[]) => {
        //this.filteredArticles = response;
        this.Articles = response;
        //this.applyFilter();

      },
      error: (error) => console.log('error in search term subscription', error),
      complete: () => console.log('Articles fetched successfully.'),
    });
  }

  applyAuthorFilter(authorId: number | undefined) {

    this.filteredArticles = this.Articles.filter((i) => i.authorId === authorId);

    if(this.filteredArticles.length==0)
      this.noArticles=true;
    else
    {
      this.noArticles=false;
    }
    // Find the selected author and update `currentClickedUser`
    const selectedAuthor = this.authorList.find(author => author.id === authorId);
    this.currentClickedUser = selectedAuthor ? selectedAuthor.userName : '';


  }

}
