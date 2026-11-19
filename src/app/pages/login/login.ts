import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';
  errorMessage = '';
  expectedRole = 'EMPLOYEE';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.expectedRole = this.route.snapshot.data['role'];
  }

  onInit() {
    if (this.authService.isLoggedIn()) {
      const role = this.authService.getRole();
      if (role === this.expectedRole) {
        this.router.navigate([role === 'ADMIN' ? '/employees' : '/leave']);
      } else {
        this.errorMessage = this.expectedRole === 'ADMIN'
          ? 'This account is not an admin. Use the Employee login.'
          : 'This is an admin account. Use the Admin login.';
        this.cdr.markForCheck();
      }
    }
  }

  onLogin() {
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.role !== this.expectedRole) {
          this.errorMessage = this.expectedRole === 'ADMIN'
            ? 'This account is not an admin. Use the Employee login.'
            : 'This is an admin account. Use the Admin login.';
          this.cdr.markForCheck();
          return;   // do not save the token
        }
        this.authService.saveSession(response);
        this.router.navigate([response.role === 'ADMIN' ? '/employees' : '/leave']);
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
        this.cdr.markForCheck();
      }
    });
  }
}