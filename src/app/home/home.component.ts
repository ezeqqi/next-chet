import { Component, OnInit } from '@angular/core';
import { AuthService } from '@/app/auth/auth.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService) {}
  users: [] = [];
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.authService.getUsers().subscribe({
      next: (response) => {
        console.log('users :', response);
        this.users = response;
      },
      error: (error) => {
        console.error('get failed:', error);
      },
    });
  }
}
