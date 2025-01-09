import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent {
  loginForm!: FormGroup;
  formSubmitted!: boolean;

  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createLoginForm()
    /* this.authService.initGoogleAuth();
    this.authService.attachSignin(document.getElementById('googleBtn')); */
  }

  createLoginForm(): void {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), this.validateTrimPassword.bind(this),]], // Name is required
      password: [null, [Validators.required, Validators.minLength(8), this.validateTrimPassword.bind(this)]], // Password is required
    });
  }

  validateAndTrim(control: AbstractControl): ValidationErrors | null {
    const value = control.value || ''; // Handle null or undefined values
    //const trimmedValue = value.trim();
  
    // If the trimmed value is empty, return a whitespace error
    if (value.length === 0) {
      return { whitespace: true };
    }
  
    // Trim the value directly in the control (optional, can do separately on submit)
    // if (value !== trimmedValue) {
    //   control.setValue(trimmedValue, { emitEvent: false }); // Avoid triggering valueChanges unnecessarily
    // }
  
    return null; // Input is valid
  }

  validateTrimPassword(control: AbstractControl): ValidationErrors | null {
    const value = control.value || ''; // Handle null or undefined values
    const trimmedValue = value.trim();

    // If the trimmed value is empty, return a whitespace error
    if (trimmedValue.length === 0) {
      return { whitespace: true };
    }

    // Trim the value directly in the control (optional, can do separately on submit)
    if (value !== trimmedValue) {
      control.setValue(trimmedValue, { emitEvent: false }); // Avoid triggering valueChanges unnecessarily
    }

    return null; // Input is valid
  }

  // Getter for Form Controls
  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }


  // Login Method
  onLogin() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      const token = this.authService.authUser(this.loginForm.value);
      const trimmedUserName = this.userName?.value.trim();
      this.loginForm.patchValue({ userName: trimmedUserName });
      if (token) {
        localStorage.setItem('token', token.userName);
        console.log('Successfully logged in');
        alert('Login successful');
        this.router.navigate(['/']);
      } else {
        console.error('Failed to login');
        alert('Failed to login. Enter correct credentials');
      }
      this.formSubmitted = false;
      this.loginForm.reset();
    } else {
      console.error('Form is invalid');
    }
  }

  

  // onLogin(loginForm: NgForm) {
  //   console.log(loginForm.value);
  //   const token = this.authService.authUser(loginForm.value);
  //   if (token) {
  //     localStorage.setItem('token', token.userName);
      
  //     console.log('Successfully logged in');
  //     this.router.navigate(['/']);
  //   } else {
  //     console.log('Failed to login');
  //   }
  // }
}
