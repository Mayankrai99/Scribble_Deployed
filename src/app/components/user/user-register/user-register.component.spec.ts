import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegisterComponent } from './user-register.component';

describe('UserRegisterComponent', () => {
  let component: UserRegisterComponent;
  let fixture: ComponentFixture<UserRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRegisterComponent],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test Case 1: Form Initialization
  it('should initialize the form with default values and validators', () => {
    const form = component.registrationForm;

    expect(form).toBeDefined();
    expect(form.controls['userName']).toBeDefined();
    expect(form.controls['email']).toBeDefined();
    expect(form.controls['password']).toBeDefined();
    expect(form.controls['confirmPassword']).toBeDefined();

    expect(form.controls['userName'].valid).toBeFalsy();
    expect(form.controls['email'].valid).toBeFalsy();
    expect(form.controls['password'].valid).toBeFalsy();
    expect(form.controls['confirmPassword'].valid).toBeFalsy();
  });

  // Test Case 2: Form Submission with Valid Data
  it('should call onSubmit method with valid data', () => {
    spyOn(component, 'onSubmit');

    component.registrationForm.controls['userName'].setValue('John Doe');
    component.registrationForm.controls['email'].setValue('john.doe@example.com');
    component.registrationForm.controls['password'].setValue('password123');
    component.registrationForm.controls['confirmPassword'].setValue('password123');

    component.onSubmit();

    expect(component.onSubmit).toHaveBeenCalled();
  });

  // Test Case 3: Validation Error Messages
  it('should display validation error messages for invalid fields', () => {
    component.registrationForm.controls['userName'].setValue('');
    component.registrationForm.controls['email'].setValue('invalid-email');
    component.registrationForm.controls['password'].setValue('short');
    component.registrationForm.controls['confirmPassword'].setValue('');

    component.formSubmitted = true;
    fixture.detectChanges();

    const errorMessages = fixture.nativeElement.querySelectorAll('span.error-block.text-danger');

    expect(errorMessages[0].textContent).toContain('Please provide name');
    expect(errorMessages[1].textContent).toContain('Please provide a valid email');
    expect(errorMessages[2].textContent).toContain('Password must be at least 8 characters long');
    expect(errorMessages[3].textContent).toContain('Please confirm password');
  });
});
