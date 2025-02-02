import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreAuthorComponent } from './explore-author.component';

describe('ExploreAuthorComponent', () => {
  let component: ExploreAuthorComponent;
  let fixture: ComponentFixture<ExploreAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreAuthorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
