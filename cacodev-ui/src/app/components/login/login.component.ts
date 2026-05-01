import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoading = false;
  hidePassword = true;
  hideRegPassword = true;
  isRegisterMode = false;
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      memberId: ['', [Validators.required]]
    });
  }

  toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.snackBar.open('Login successful!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (err) => {
        const message = err.error?.message || 'Login failed. Please try again.';
        this.snackBar.open(message, 'Close', {
          duration: 5000,
          panelClass: ['snackbar-error']
        });
        this.isLoading = false;
      }
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.snackBar.open('Registration successful!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (err) => {
        const message = err.error?.message || 'Registration failed. Please try again.';
        this.snackBar.open(message, 'Close', {
          duration: 5000,
          panelClass: ['snackbar-error']
        });
        this.isLoading = false;
      }
    });
  }
}
