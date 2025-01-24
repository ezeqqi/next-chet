import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  constructor(private http: HttpClient) {}
  readonly loginForm = new FormGroup({
    nickname: new FormControl(''),
    password: new FormControl(''),
  });

  submit(): void {
    // event.preventDefault();
    const baseUrl: string = 'http://localhost:3000/';
    console.log('this.loginForm', this.loginForm.value);
    // console.log('loginForm', loginForm)
    this.http.post(`${baseUrl}auth/login`, this.loginForm.value).subscribe({
      next: (response) => {
        console.log('response', response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  // curl -X POST http://localhost:3000/auth/login -d '{"username": "ezeqi", "password": "password"}' -H "Content-Type: application/json"
}
