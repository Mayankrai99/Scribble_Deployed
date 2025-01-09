import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormBuilder,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../common/IUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  user!: IUser;
  formSubmitted!: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRegistrationForm();

    // Fetch the user ID if required (example: from service or backend)
    this.userService.getNewUserId().subscribe((newId: number) => {
      this.registrationForm.patchValue({ id: newId });
    });
  }

  createRegistrationForm() {
    this.registrationForm = this.fb.group(
      {
        id: [null], // Add id to the form
        userName: [null, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), this.validateAndTrim.bind(this),]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8), this.validateAndTrim.bind(this)]],
        confirmPassword: [null, Validators.required],
      },
      { validators: this.passwordMatchingValidator },
    );
  }

  validateAndTrim(control: AbstractControl): ValidationErrors | null {
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

  passwordMatchingValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  userData(): IUser {
    return (this.user = {
      id: this.registrationForm.get('id')?.value, // Fetch the ID from form
      userName: this.userName?.value,
      email: this.email?.value,
      password: this.password?.value,
    });
  }

  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.registrationForm.valid) {
      const trimmedUserName = this.userName?.value.trim();
      this.registrationForm.patchValue({ userName: trimmedUserName });
      this.userService.addUsers(this.userData());
      this.registrationForm.reset();
      this.formSubmitted = false;
      //alert('Registration successful');
      this.router.navigate(['/user/login']);
    } else {
      //alertify.error('error message');
      console.error('error message');
      alert('Inorrect credentials');
      
    }
  }
}