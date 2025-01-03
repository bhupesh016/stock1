import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  apiUrl = 'http://35.154.90.3:8080/backend/auth/signup';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')]
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      flagTermsAndCondition: [false, [Validators.requiredTrue]]
    });
  }

  get firstName() {
    return this.registrationForm.get('firstName');
  }

  get lastName() {
    return this.registrationForm.get('lastName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get phoneNumber() {
    return this.registrationForm.get('phoneNumber');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get flagTermsAndCondition() {
    return this.registrationForm.get('flagTermsAndCondition');
  }

  onRegister() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      this.http.post(this.apiUrl, formData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          alert('Registration successful!');
        },
        error: (error) => {
          console.error('Registration failed:', error);
          alert('Registration failed. Please try again.');
        }
      });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
