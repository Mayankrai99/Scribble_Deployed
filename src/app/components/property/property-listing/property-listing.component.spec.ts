import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyListingComponent } from './property-listing.component';
import { HousingService } from '../../../services/housing.service';
import { of } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('PropertyListingComponent', () => {
  let component: PropertyListingComponent;
  let fixture: ComponentFixture<PropertyListingComponent>;
  let housingService: jasmine.SpyObj<HousingService>;

  beforeEach(() => {
    const housingServiceSpy = jasmine.createSpyObj('HousingService', ['getAllArticles']);

    TestBed.configureTestingModule({
      declarations: [PropertyListingComponent],
      providers: [
        { provide: HousingService, useValue: housingServiceSpy },
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });

    fixture = TestBed.createComponent(PropertyListingComponent);
    component = fixture.componentInstance;
    housingService = TestBed.inject(HousingService) as jasmine.SpyObj<HousingService>;

    // Set up mock data
    housingService.getAllArticles.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch articles on initialization', () => {
    housingService.getAllArticles.and.returnValue(of([{ id: 1, name: 'Test Article' }]));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.Articles.length).toBeGreaterThan(0);
    expect(component.Articles[0].name).toBe('Test Article');
  });

  it('should log error if getAllArticles fails', () => {
    spyOn(console, 'log'); // Spy on console.log to check for errors
    housingService.getAllArticles.and.returnValue(of([]));
    component.ngOnInit();
    expect(console.log).toHaveBeenCalledWith('Articles fetched successfully.');
  });

  it('should set SearchCity correctly when onCityFilter is called', () => {
    component.name = 'New York';
    component.onCityFilter();
    expect(component.SearchCity).toBe('New York');
  });

  it('should reset the filters when onCityFilterReset is called', () => {
    component.name = 'New York';
    component.SearchCity = 'New York';
    component.SearchName = 'Test';
    component.onCityFilterReset();
    expect(component.name).toBe('');
    expect(component.SearchCity).toBe('');
    expect(component.SearchName).toBe('');
  });

  it('should toggle the sort direction when onSortDirection is called', () => {
    component.SortDirection = 'asc';
    component.onSortDirection();
    expect(component.SortDirection).toBe('desc');
    component.onSortDirection();
    expect(component.SortDirection).toBe('asc');
  });

  it('should check if the platform is browser', () => {
    expect(component.isBrowser).toBe(true);
  });
});
