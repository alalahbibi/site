import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };

  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.credentials.username || !this.credentials.password) {
      this.message = 'Veuillez remplir tous les champs.';
      return;
    }

    if (this.credentials.username === 'admin' && this.credentials.password === 'adminAdmin') {
      this.authService.recordLoginTime(this.credentials.username);
      this.router.navigateByUrl('/dash');
      return;
    } else {
      this.authService.login(this.credentials).subscribe(
        response => {
          localStorage.setItem('token', response.token);
          this.authService.recordLoginTime(this.credentials.username);
          this.router.navigate(['/commande-p']);
        },
        error => {
          this.message = error.error.message;
        }
      );
    }
  }

  onLogout() {
    const username = this.credentials.username;
    this.authService.recordLogoutTime(username);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
