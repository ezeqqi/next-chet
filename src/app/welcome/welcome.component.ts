import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  loginForm = {
    nickname: '',
    password: '',
  }

  submit(event: Event): String {
    event.preventDefault();
    console.log('loginForm', this.loginForm)
    return '';
  }
}
