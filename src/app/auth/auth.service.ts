import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '@/app/models/login-request.model';
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}
  private readonly baseUrl = 'http://localhost:3000';
  login(loginData: LoginRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, loginData).pipe(
      tap((response: any) => {
        if (response.access_token) {
          this.storeToken(response.access_token);
        }
      }),
    );
  }

  private storeToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }
  clearToken(): void {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/welcome']);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }
}
