import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  username = '';
  password = '';
  employeeId: number | null = null;
  errorMessage = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/leave']);
    }
  }

  onRegister() {
    this.errorMessage = '';
    if (this.employeeId === null) {
      this.errorMessage = 'Employee id is required';
      return;
    }
    this.authService.register(this.username, this.password, this.employeeId).subscribe({
      next: (response) => {
        this.authService.saveSession(response);
        this.router.navigate(['/leave']);
        this.cdr.markForCheck();
      },
      error: (err) => {
        if (err.error && err.error.fieldErrors) {
          this.errorMessage = Object.values(err.error.fieldErrors).join(', ');
        } else if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Registration failed';
        }
        this.cdr.markForCheck();
      }
    });
  }
}