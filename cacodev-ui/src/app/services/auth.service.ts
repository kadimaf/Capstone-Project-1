import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest, UserDTO } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/cacodev/api/auth';
  private currentUserSubject: BehaviorSubject<UserDTO | null>;
  currentUser$: Observable<UserDTO | null>;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.currentUserSubject = new BehaviorSubject<UserDTO | null>(this.loadStoredUser());
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  login(req: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, req).pipe(
      tap(response => this.saveTokens(response))
    );
  }

  register(req: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, req).pipe(
      tap(response => this.saveTokens(response))
    );
  }

  adminRegister(req: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, req);
  }

  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.baseUrl}/users`);
  }

  logout(): void {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.getAccessToken()}`
      });
      this.http.post(`${this.baseUrl}/logout`, { refreshToken }, { headers }).subscribe({
        complete: () => {},
        error: () => {}
      });
    }
    this.clearSession();
  }

  refreshToken(): Observable<AuthResponse> {
    const token = this.getRefreshToken();
    return this.http.post<AuthResponse>(`${this.baseUrl}/refresh-token`, token);
  }

  getMe(): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.baseUrl}/me`);
  }

  getAccessToken(): string | null {
    return this.isBrowser ? localStorage.getItem('accessToken') : null;
  }

  getRefreshToken(): string | null {
    return this.isBrowser ? localStorage.getItem('refreshToken') : null;
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  getCurrentUser(): UserDTO | null {
    return this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'ADMIN';
  }

  private saveTokens(response: AuthResponse): void {
    if (this.isBrowser) {
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('currentUser', JSON.stringify(response.user));
    }
    this.currentUserSubject.next(response.user);
  }

  private clearSession(): void {
    if (this.isBrowser) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private loadStoredUser(): UserDTO | null {
    if (!this.isBrowser) return null;
    try {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }
}
