import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '@app/auth/AuthService';
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  loginForm = new FormGroup({
    nickname: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  submit() {
    if (this.loginForm.valid) {
      const payload = this.loginForm.value;
      this.authService.login(payload).subscribe({
        next: (response) => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Login failed:', error);
        },
      });
    }
  }
  // curl -X POST http://localhost:3000/auth/login -d '{"username": "ezeqi", "password": "password"}' -H "Content-Type: application/json"
}
