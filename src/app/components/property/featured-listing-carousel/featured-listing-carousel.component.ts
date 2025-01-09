//import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-featured-listing-carousel',
  standalone: true,
  templateUrl: './featured-listing-carousel.component.html',
  styleUrl: './featured-listing-carousel.component.css',
})
export class FeaturedListingCarouselComponent implements OnInit {
  // slides = [
  //   {
  //     title: 'Gun Hill',
  //     content:
  //       '3BHK House, Well Maintained builder floor available for rent at prime location. ',
  //     imgSrc: 'assets/images/prop-1.jpg',
  //   },
  //   {
  //     title: 'Elite Enclave',
  //     content: '4BHK Villa,  Elite Dwellings Inc. Modern Metropolis Homes;',
  //     imgSrc: 'assets/images/prop-2.jpg',
  //   },
  //   {
  //     title: 'Oasis',
  //     content:
  //       '2BHK, Uptown Residence Co. Apex City Apartments; Downtown Living Spaces; Urban Oasis Properties;.',
  //     imgSrc: 'assets/images/prop-3.jpg',
  //   },
  //   {
  //     title: 'Abbey Cottage',
  //     content:
  //       '3BHK, Garden Farm Cottage; Lakeside Bungalow; Countryside Retreat',
  //     imgSrc: 'assets/images/prop-4.jpg',
  //   },
  //   {
  //     title: 'Metro Apartments',
  //     content:
  //       'Apartments Business Names. Urban Dwellings; Cityscape Apartments; Metro Living; Skyline Residences; Modern Heights; Central Park Condos;.',
  //     imgSrc: 'assets/images/prop-5.jpeg',
  //   },
  // ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {






    // if (isPlatformBrowser(this.platformId)) {
    //   const carouselElement = document.getElementById(
    //     'carouselExampleCaptions'
    //   )!;
    //   const slideTitle = document.getElementById('slideTitle')!;
    //   const slideContent = document.getElementById('slideContent')!;
    //   const slideImg = document.querySelector(
    //     '.carousel-item.active img'
    //   ) as HTMLImageElement;

    //   carouselElement.addEventListener('slide.bs.carousel', (event: any) => {
    //     const { relatedTarget } = event;
    //     const index = [...relatedTarget.parentNode.children].indexOf(
    //       relatedTarget
    //     );

    //     // slideTitle.textContent = this.slides[index].title;
    //     // slideContent.textContent = this.slides[index].content;
    //     // slideImg.src = this.slides[index].imgSrc;
    //   });
    // }
  }

  
}
