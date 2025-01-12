import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IPropertyBase, IArticleBase } from '../../../common/IPropertyBase';
import { HousingService } from '../../../services/housing.service';

@Component({
  selector: 'app-property-listing',
  templateUrl: './property-listing.component.html',
  styleUrls: ['./property-listing.component.css'],
})
export class PropertyListingComponent implements OnInit {
  [x: string]: any;
  Properties: IPropertyBase[] = []; // Initialize as an empty array
  Articles: IArticleBase[] = [];
  filteredArticles: IArticleBase[] = [];
  city = '';
  name = '';
  SearchCity = '';
  SearchName = '';
  public isBrowser: boolean;
  SortbyParam = '';
  SortDirection = 'asc';
  searchTest: string = '';
  searchTerm: string = '';
  articleCount: any;

  constructor(
    private housingService: HousingService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    
    this.getArticles();    
  }

  getArticles():void {
    console.log('',)
    this.housingService.getAllArticles().subscribe({
      next: (response: IArticleBase[]) => {
        //this.filteredArticles = response;
        this.Articles = response;
        this.applyFilter();
        
      },
      error: (error) => console.log('error in search term subscription',error),
      complete: () => console.log('Articles fetched successfully.'),
    });
  }

  applyFilter(): void {
    console.log('apply filter is called', this.searchTest)

    this.searchTest = this.searchTerm.trim();

    if (this.searchTest.trim().length>0) {
      this.filteredArticles = this.Articles.filter((item) =>
        //item.name.toLowerCase()===this.searchTest.toLowerCase()
        item.name.toLowerCase().includes(this.searchTest.toLowerCase())

      );
    } else {
      this.filteredArticles = this.Articles; // No filter, show all items
    }

    this.articleCount=this.filteredArticles.length;
  }

  // onCityFilter() {
  //   console.log("your name: ",this.name);
  //   this.SearchCity = this.name.trim();
  // }

  // onCityFilterReset() {
  //   this.name = '';
  //   this.SearchCity = '';
  //   this.SearchName = '';
  // }

  // onSortDirection() {
  //   this.SortDirection = this.SortDirection === 'desc' ? 'asc' : 'desc';
    
  // }
}
