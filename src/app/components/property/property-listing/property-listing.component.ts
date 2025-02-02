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
  paginatedArticles: IArticleBase[] = [];
  city = '';
  name = '';
  SearchCity = '';
  SearchName = '';
  public isBrowser: boolean;
  SortbyParam = '';
  SortDirection = 'asc';
  searchTest: string = '';
  searchTerm: string = '';
  //articleCount: any;
  articleCount: number = 0;
  itemsPerPage: number = 8;
  currentPage: number = 1;
  totalPages: number = 0;

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

    /* this.articleCount = this.filteredArticles.length;
    this.totalPages = Math.ceil(this.articleCount / this.itemsPerPage);
    this.currentPage = 1; // Reset to first page when filtering
    this.updateDisplayedArticles(); */
    this.sortArticles();
  }

  sortArticles(): void {
    this.filteredArticles.sort((a, b) => {
      const dateA = a.dateOfPublish ? new Date(a.dateOfPublish).getTime() : 0;
      const dateB = b.dateOfPublish ? new Date(b.dateOfPublish).getTime() : 0;

      if (this.SortbyParam === 'newest') {
        return dateB - dateA; // Newest first
      } else if (this.SortbyParam === 'oldest') {
        return dateA - dateB; // Oldest first
      }
      return 0; // No sorting if no sorting parameter is set
    });

    this.articleCount = this.filteredArticles.length;
    this.totalPages = Math.ceil(this.articleCount / this.itemsPerPage);
    this.currentPage = 1; // Reset to first page when filtering
    this.updateDisplayedArticles();
  }

  updateDisplayedArticles(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedArticles = this.filteredArticles.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedArticles();
    }
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.SortbyParam = '';
    this.filteredArticles = [...this.Articles]; // Reset to original data
    this.articleCount = this.filteredArticles.length;
    this.totalPages = Math.ceil(this.articleCount / this.itemsPerPage);
    this.currentPage = 1;
    this.updateDisplayedArticles();

  }

}
