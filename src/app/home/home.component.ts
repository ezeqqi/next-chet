import { signal, Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@/app/auth/auth.service';
import { catchError } from 'rxjs';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  authService = inject(AuthService);
  users = signal<Array<any>>([]);

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.authService
      .getUsers()
      .pipe(
        catchError((err) => {
          console.log('error get users', err);
          throw err;
        }),
      )
      .subscribe({
        next: (users) => {
          console.log('users: ', users);
          this.users.set(users);
        },
      });
  }
}
