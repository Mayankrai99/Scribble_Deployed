import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedListingCarouselComponent } from './featured-listing-carousel.component';

describe('FeaturedListingCarouselComponent', () => {
  let component: FeaturedListingCarouselComponent;
  let fixture: ComponentFixture<FeaturedListingCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeaturedListingCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeaturedListingCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
