import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UserLoginComponent } from './user-login.component';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserLoginComponent],
      imports:[FormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test Case 1: Form Initialization
  it('should initialize the form with default values and validators', () => {
    const form = fixture.nativeElement.querySelector('form');
    
    const userNameInput = form.querySelector('input[name="userName"]');
    const passwordInput = form.querySelector('input[name="password"]');

    expect(userNameInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    
    expect(component.loginForm.valid).toBeFalsy(); // Form should be invalid initially
  });

  // Test Case 2: Valid Form Submission
  it('should call onLogin when form is submitted with valid data', () => {
    spyOn(component, 'onLogin');

    const form = fixture.nativeElement.querySelector('form');
    const userNameInput = form.querySelector('input[name="userName"]');
    const passwordInput = form.querySelector('input[name="password"]');

    // Set form values
    userNameInput.value = 'JohnDoe';
    userNameInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'password123';
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // Check that the form is now valid
    expect(component.loginForm.valid).toBeTruthy();

    // Simulate form submission
    form.dispatchEvent(new Event('submit'));

    expect(component.onLogin).toHaveBeenCalled();
  });

  // Test Case 3: Invalid Form Submission (Form Disabled)
  it('should disable the login button when form is invalid', () => {
    const form = fixture.nativeElement.querySelector('form');
    const loginButton = fixture.nativeElement.querySelector('button[type="submit"]');

    // Form is initially invalid, so the button should be disabled
    expect(loginButton.disabled).toBeTruthy();

    const userNameInput = form.querySelector('input[name="userName"]');
    const passwordInput = form.querySelector('input[name="password"]');

    // Set only one value (invalid form state)
    userNameInput.value = 'JohnDoe';
    userNameInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // Check that the button is still disabled since the form is invalid
    expect(loginButton.disabled).toBeTruthy();
  });
});
