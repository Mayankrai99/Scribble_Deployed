import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPropertyComponent } from './add-property.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HousingService } from '../../../services/housing.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { By } from '@angular/platform-browser';

describe('AddPropertyComponent', () => {
  let component: AddPropertyComponent;
  let fixture: ComponentFixture<AddPropertyComponent>;
  let housingService: jasmine.SpyObj<HousingService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const housingServiceSpy = jasmine.createSpyObj('HousingService', ['addArticle', 'newArticleId']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        RichTextEditorModule
      ],
      declarations: [AddPropertyComponent, TabsetComponent],
      providers: [
        FormBuilder,
        { provide: HousingService, useValue: housingServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    fixture = TestBed.createComponent(AddPropertyComponent);
    component = fixture.componentInstance;
    housingService = TestBed.inject(HousingService) as jasmine.SpyObj<HousingService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Set up the mock service methods
    housingService.newArticleId.and.returnValue(1);
    //housingService.addArticle.and.returnValue(of(undefined)); // Assuming the return type is void or an observable

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.rteForm).toBeDefined();
    expect(component.rteForm.get('articlename')?.value).toBe('');
    expect(component.rteForm.get('htmlContent')?.value).toBe('');
  });

  it('should call mapProperty on submit', () => {
    spyOn(component, 'mapProperty');
    component.onSubmit();
    expect(component.mapProperty).toHaveBeenCalled();
  });

  it('should navigate to home page after successful submission', () => {
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should reset the form on reset', () => {
    const defaultValues = { articlename: '', htmlContent: 'Enter text here...' };
    component.onReset();
    expect(component.rteForm.value).toEqual(defaultValues);
  });

  it('should validate noWhitespaceValidator and return error if whitespace only', () => {
    const control = component.rteForm.get('articlename');
    control?.setValue('   ');
    expect(control?.valid).toBeFalse();
  });

  it('should validate sanitizeRichTextContent and return error if content is only whitespace', () => {
    const control = component.rteForm.get('htmlContent');
    control?.setValue('   ');
    expect(control?.valid).toBeFalse();
  });

  it('should call housingService.addArticle on form submit', () => {
    component.rteForm.setValue({
      articlename: 'Test Article',
      htmlContent: 'Test content'
    });
    component.onSubmit();
    expect(housingService.addArticle).toHaveBeenCalled();
  });

  it('should call housingService.newArticleId to generate article ID on submit', () => {
    component.onSubmit();
    expect(housingService.newArticleId).toHaveBeenCalled();
  });

  it('should select a tab when selectTab is called', () => {
    const tabIndex = 1;
    component.selectTab(tabIndex);
    expect(component.formTabs.tabs[tabIndex].active).toBeTrue();
  });

  it('should call onBack to navigate back to home page', () => {
    component.onBack();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
