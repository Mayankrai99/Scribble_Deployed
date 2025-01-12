// import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
// import { FormsModule, FormGroup, FormBuilder } from '@angular/forms';
// import { SearchService } from '../../../services/search.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-featured-listing-carousel',
//   templateUrl: './featured-listing-carousel.component.html',
//   styleUrl: './featured-listing-carousel.component.css',
//   standalone: true,
//   imports: [FormsModule, CommonModule]
// })
// export class FeaturedListingCarouselComponent {
//   searchForm!: FormGroup;
//   searchValue: string = '';

//   searchQuery: string = '';
//   searchTerm: string = '';
  

//   constructor(@Inject(PLATFORM_ID) private platformId: Object, private searchService: SearchService) {
//   }


//   onSearch() {
//     console.log('submit button clicked')
//     this.searchService.setSearchTerm(this.searchTerm);
//   }

  
// }
