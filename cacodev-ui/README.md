# CACODEV UI - Frontend

A modern Angular 19+ Single Page Application (SPA) for the CACODEV Shalom platform, built with Angular Material, Bootstrap, and Angular Universal for Server-Side Rendering (SSR).

## 📋 Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Build & Deployment](#build--deployment)
- [Project Structure](#project-structure)
- [Features](#features)
- [Development Guide](#development-guide)
- [Testing](#testing)
- [Performance & Optimization](#performance--optimization)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

CACODEV UI is a comprehensive Angular-based web application that delivers the user-facing interface for the CACODEV Shalom community platform. Built with modern Angular 19 technologies, it provides members and administrators with an intuitive, responsive interface to access community features and services.

### What is CACODEV Shalom?

CACODEV Shalom is a community-driven platform inspired by the Hebrew concept of "Shalom" (peace/wholeness). It's designed to strengthen communities by facilitating connection, enabling charitable giving, organizing events, recognizing contributions, and providing AI-enhanced support. The platform empowers organizations to build stronger, more engaged communities.

### What Can You Do With This Application?

**Community Members Can:**
- Create accounts and maintain member profiles
- Discover and participate in community events
- Make donations to support community initiatives (one-time or recurring)
- View their contribution history and impact
- Access AI-powered assistance for questions and guidance
- Connect with other community members

**Community Administrators Can:**
- Manage member profiles and track engagement
- Create and manage community events
- Process and monitor donations
- Track member contributions and participation
- Generate reports on community engagement
- Manage payments and financial transactions

### Key Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Member Portal**: Personalized dashboards showcasing member profiles and history
- **Event Management**: Browse, register, and participate in community events
- **Donation Platform**: Secure donation processing with multiple payment options
- **Contribution Tracking**: View and celebrate member contributions to the community
- **Secure Authentication**: JWT-based authentication with automatic token refresh
- **AI Assistant**: Built-in AI chat for community support and guidance
- **High Performance**: Server-Side Rendering (SSR) for improved SEO and faster page loads
- **Accessibility**: Built with accessibility standards to serve all community members
- **Scalable Architecture**: Lazy-loaded modules and optimized builds for performance

The application provides a modern, user-friendly interface that makes community engagement accessible and rewarding for all participants.

## 🛠 Technology Stack

### Framework & Language
- **Angular**: 19.1.0 (Latest)
- **TypeScript**: 5.7.2 (Strict mode)
- **RxJS**: 7.8.0 (Reactive programming)

### UI Component Libraries
- **Angular Material**: 19.2.9 (UI components and design system)
- **Angular CDK**: 19.2.9 (Component Development Kit)
- **Bootstrap**: 5.3.5 (Responsive grid and utilities)
- **PopperJS**: 2.11.8 (Tooltip and popover positioning)

### Server-Side Rendering
- **Angular Platform Server**: 19.1.0 (SSR support)
- **Angular SSR**: 19.1.8 (SSR integration)
- **Express.js**: 4.18.2 (Node.js server)

### Build & Tooling
- **Angular CLI**: 21.2.3 (Build and development tools)
- **Angular DevKit**: 19.1.8 (Build optimization)
- **TypeScript Compiler**: Integrated with Angular CLI

### Testing
- **Jasmine**: 5.5.0 (Testing framework)
- **Karma**: 6.4.0 (Test runner)
- **Karma Chrome Launcher**: 3.2.0
- **Karma Coverage**: 2.2.0 (Code coverage reports)

### Development
- **Angular Compiler**: 19.1.0
- **Node.js**: 18+ (LTS recommended)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required
- **Node.js**: Version 18.18.0 or higher (LTS recommended)
  - Download from: https://nodejs.org/
  - Verify: `node --version` and `npm --version`

- **npm**: Version 9 or higher (included with Node.js)
  - Verify: `npm --version`

- **Git**: For version control
  - Download from: https://git-scm.com/

### Recommended
- **IDE/Editor**:
  - Visual Studio Code with Angular essentials
  - WebStorm / IntelliJ IDEA Ultimate
  - Sublime Text with extensions

- **Browser Extensions** (for development):
  - Angular DevTools (Chrome/Firefox)
  - Redux DevTools (if using state management)
  - Augury (Angular DevTools)

- **Tools**:
  - Postman or Insomnia (API testing)
  - Git GUI client (TortoiseGit, SourceTree)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
# Clone the CACODEV UI repository
git clone <repository-url> cacodev-ui
cd cacodev-ui
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using npm ci for reproducible installs
npm ci
```

This will install all dependencies defined in `package.json`.

### 3. Verify Installation

```bash
# Check Angular CLI installation
ng version

# Check installed packages
npm list --depth=0
```

### 4. Environment Configuration

Create environment configuration files:

**src/environments/environment.ts** (Development)
```typescript
export const environment = {
  production: false,
  apiUrl: process.env['ANGULAR_API_URL'] || 'http://localhost:8080/cacodev/api',
  stripePublicKey: process.env['STRIPE_PUBLIC_KEY'] || '',
  enableLogging: true,
  logLevel: 'debug'
};
```

**src/environments/environment.prod.ts** (Production)
```typescript
export const environment = {
  production: true,
  apiUrl: process.env['ANGULAR_API_URL'] || 'https://api.cacodev.com/cacodev/api',
  stripePublicKey: process.env['STRIPE_PUBLIC_KEY'] || '',
  enableLogging: false,
  logLevel: 'error'
};
```

### Environment Variables for Frontend

Create a `.env` file in the project root (not committed to version control):

```env
ANGULAR_API_URL=http://localhost:8080/cacodev/api
STRIPE_PUBLIC_KEY=<your-stripe-publishable-key>
NODE_ENV=development
```

**Important**: Replace `<your-stripe-publishable-key>` with your actual Stripe publishable key (pk_test_... for development or pk_live_... for production).

### Getting Stripe Public Key

1. Visit https://stripe.com and log in to your account
2. Navigate to Developers > API keys
3. Copy your Publishable Key (starts with pk_test_... or pk_live_...)
4. Add it to your `.env` file or set as an environment variable

## 🚀 Running the Application

### Development Server

```bash
# Start development server with live reload
npm start

# Alternative command
ng serve

# With specific port
ng serve --port 4201

# Enable source maps and debugging
ng serve --source-map
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload when you modify any source files.

### Development with Debugging

```bash
# Run with source maps enabled
ng serve --source-map

# Open browser DevTools (F12) and go to Sources tab
# Set breakpoints in TypeScript source code
```

### Production Build and Preview

```bash
# Build for production
npm run build

# Serve production build locally
http-server dist/cacodev-ui -p 8000
```

### Server-Side Rendering (SSR)

```bash
# Build with SSR
ng build --configuration production
npm run build

# Run SSR server
npm run serve:ssr:cacodev-ui

# Application available at http://localhost:4000
```

## 🏗️ Build & Deployment

### Development Build

```bash
# Development build (larger, with debugging support)
ng build

# Watch mode for continuous builds
npm run watch
```

### Production Build

```bash
# Optimized production build
npm run build

# With inline styles and scripts
ng build --configuration production --inline-styles --inline-scripts

# Generate production-ready bundle
# Output location: dist/cacodev-ui/
```

### Build Optimization Features

The production build includes:

- **Code Splitting**: Lazy-loaded modules are split into separate chunks
- **Tree-Shaking**: Unused code is removed
- **Minification**: JavaScript and CSS are minified
- **Compression**: Assets are compressed
- **Source Maps**: Optional sourcemaps for debugging
- **AOT Compilation**: Ahead-of-Time compilation enabled

### Build Budget Warnings

The project includes bundle size budgets to prevent performance regressions:

```json
// From angular.json
"budgets": [
  {
    "type": "initial",
    "maximumWarning": "500kB",
    "maximumError": "1MB"
  },
  {
    "type": "anyComponentStyle",
    "maximumWarning": "4kB",
    "maximumError": "8kB"
  }
]
```

### Deployment Platforms

#### Docker
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g @angular/cli
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --production
EXPOSE 4200
CMD ["npm", "start"]
```

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir dist/cacodev-ui
```

#### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Traditional Server
```bash
# Build and copy dist/ to web server
npm run build
# Copy dist/cacodev-ui/* to /var/www/cacodev-ui/
```

## 📂 Project Structure

```
cacodev-ui/
├── src/
│   ├── app/
│   │   ├── app.component.ts              # Root component
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.config.ts                 # App configuration
│   │   ├── app.routes.ts                 # Route definitions
│   │   ├── app.server.config.ts          # SSR configuration
│   │   ├── components/                   # Shared components
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   ├── navigation/
│   │   │   └── ...
│   │   ├── features/                     # Feature modules
│   │   │   ├── auth/                     # Authentication
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── ...
│   │   │   ├── dashboard/                # Dashboard feature
│   │   │   ├── members/                  # Member management
│   │   │   ├── donations/                # Donation feature
│   │   │   ├── events/                   # Event feature
│   │   │   ├── payments/                 # Payment feature
│   │   │   └── ...
│   │   ├── services/                     # Shared services
│   │   │   ├── api.service.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── error.service.ts
│   │   │   └── ...
│   │   ├── models/                       # TypeScript models/interfaces
│   │   │   ├── user.model.ts
│   │   │   ├── member.model.ts
│   │   │   ├── donation.model.ts
│   │   │   └── ...
│   │   ├── guards/                       # Route guards
│   │   │   ├── auth.guard.ts
│   │   │   └── role.guard.ts
│   │   ├── interceptors/                 # HTTP interceptors
│   │   │   ├── auth.interceptor.ts
│   │   │   ├── error.interceptor.ts
│   │   │   └── ...
│   │   └── utils/                        # Utility functions
│   │       ├── validators.ts
│   │       ├── formatters.ts
│   │       └── ...
│   ├── assets/                           # Static assets
│   │   ├── images/
│   │   ├── icons/
│   │   └── data/
│   ├── styles/                           # Global styles
│   │   ├── styles.scss                   # Main stylesheet
│   │   ├── variables.scss                # SCSS variables
│   │   ├── mixins.scss                   # SCSS mixins
│   │   └── themes/                       # Theme files
│   ├── environments/                     # Environment config
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   ├── index.html                        # HTML entry point
│   ├── main.ts                           # Application entry point
│   ├── main.server.ts                    # SSR entry point
│   ├── server.ts                         # Express server for SSR
│   ├── polyfills.ts                      # Browser polyfills
│   ├── favicon.ico                       # Application favicon
│   └── public/                           # Public files for SSR
├── dist/                                 # Build output (generated)
├── angular.json                          # Angular CLI configuration
├── tsconfig.app.json                     # TypeScript config for app
├── tsconfig.spec.json                    # TypeScript config for tests
├── tsconfig.json                         # TypeScript base config
├── karma.conf.js                         # Test runner configuration
├── package.json                          # Project dependencies
├── package-lock.json                     # Dependency lock file
└── README.md                             # This file
```

### Feature Module Organization

Each feature module follows this structure:

```
features/feature-name/
├── components/
│   ├── feature-list/
│   │   ├── feature-list.component.ts
│   │   ├── feature-list.component.html
│   │   ├── feature-list.component.scss
│   │   └── feature-list.component.spec.ts
│   └── feature-detail/
│       └── ...
├── services/
│   ├── feature.service.ts                # API service for feature
│   └── feature.service.spec.ts
├── models/
│   └── feature.model.ts                  # TypeScript interfaces
├── feature.routes.ts                     # Feature route definitions
└── feature.module.ts                     # Feature module (if using modules)
```

## ✨ Features

### Authentication & Security
- User login and registration
- JWT token management
- Automatic token refresh
- Secure HTTP interceptors
- Role-based access control
- Protected routes with guards

### User Interface
- Responsive design with Bootstrap grid
- Angular Material components (buttons, cards, forms, dialogs, etc.)
- Consistent styling with SCSS
- Accessible components (ARIA labels)
- Material Design icons

### Member Management
- View member profiles
- Create and edit member information
- Search and filter members
- Member status tracking
- Member list with pagination

### Donation Features
- Browse donation options
- Make donations with Stripe integration
- View donation history
- Recurring donation setup
- Donation receipts

### Event Management
- View upcoming events
- Event details and registration
- Event search and filtering
- Event calendar view
- Event notifications

### Payment Processing
- Stripe checkout integration
- Payment status tracking
- Secure payment handling
- Payment history and receipts
- Webhook handling for payment updates

### Data Management
- Client-side caching
- Real-time data updates with RxJS
- Optimistic updates
- Error handling and recovery
- Loading states and spinners

### Performance
- Lazy-loaded modules
- Code splitting
- Tree-shaking unused code
- Minification and compression
- Server-Side Rendering (SSR)
- Caching strategies

## 👨‍💻 Development Guide

### Creating a New Component

```bash
# Generate component using Angular CLI
ng generate component features/auth/components/login

# This creates:
# - login.component.ts
# - login.component.html
# - login.component.scss
# - login.component.spec.ts
```

### Example Component

```typescript
// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f['email'].value, this.f['password'].value)
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.error = error.message;
          this.loading = false;
        }
      });
  }
}
```

### Creating a Service

```bash
# Generate service
ng generate service services/api

# Service with authentication
ng generate service services/auth
```

### Example Service with HTTP Calls

```typescript
// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUser = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.loadUser();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          this.currentUser.next(response.user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUser.next(null);
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }

  private loadUser(): void {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode JWT and set current user
    }
  }
}
```

### Code Style Guidelines

- Use strict TypeScript mode
- Follow Angular style guide
- Use reactive forms over template-driven forms
- Use async pipe for observables
- Implement OnDestroy for cleanup
- Use trackBy in *ngFor loops for performance
- Avoid directly modifying DOM; use Angular directives

### Best Practices

1. **Component Communication**
   - Use @Input/@Output for parent-child
   - Use services with RxJS for sibling communication
   - Use guards for route-based data

2. **State Management**
   - Keep component state minimal
   - Use services for shared state
   - Consider NgRx for complex state

3. **Performance**
   - Use OnPush change detection strategy
   - Lazy load feature modules
   - Unsubscribe using takeUntil pattern
   - Use trackBy in *ngFor

4. **Testing**
   - Write unit tests for services
   - Write component tests with TestBed
   - Mock HTTP calls with HttpClientTestingModule

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in CI mode (headless)
ng test --watch=false --browsers=ChromeHeadless

# Run with code coverage
ng test --no-watch --code-coverage

# Coverage report location: coverage/cacodev-ui/index.html
```

### Run Specific Test File

```bash
# Run only auth service tests
ng test --include='**/auth.service.spec.ts'
```

### Example Test

```typescript
// auth.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should login successfully', () => {
    service.login('test@example.com', 'password').subscribe(response => {
      expect(response.token).toBeTruthy();
    });

    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush({ token: 'jwt-token', user: { id: 1 } });
  });
});
```

## ⚡ Performance & Optimization

### Bundle Analysis

```bash
# Install webpack bundle analyzer
npm install --save-dev webpack-bundle-analyzer

# Analyze bundle
ng build --configuration production --stats-json
webpack-bundle-analyzer dist/cacodev-ui/stats.json
```

### Enable Production Features

```typescript
// In environment.prod.ts
enableTracing: false
production: true
```

### Lazy Loading Configuration

```typescript
// app.routes.ts
const routes: Routes = [
  {
    path: 'features',
    loadChildren: () => import('./features/features.routes')
      .then(m => m.FEATURE_ROUTES)
  }
];
```

### Image Optimization

```html
<!-- Use Angular's image directive for optimization -->
<img ngSrc="path/to/image.jpg" width="400" height="300" alt="Description" />
```

### HTTP Caching Strategy

```typescript
// Use caching interceptor for GET requests
export class CachingInterceptor implements HttpInterceptor {
  private cache = new Map<string, any>();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'GET' && this.cache.has(req.url)) {
      return of(this.cache.get(req.url));
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse && req.method === 'GET') {
          this.cache.set(req.url, event);
        }
      })
    );
  }
}
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Port 4200 Already in Use

```bash
# Run on different port
ng serve --port 4201

# Or kill process using port 4200
netstat -ano | findstr :4200
taskkill /PID [PID] /F
```

#### 2. Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
```

#### 3. Compilation Errors

```bash
# Check TypeScript errors
ng build --configuration development

# Fix lint errors
ng lint --fix
```

#### 4. HTTP 404 API Calls

**Error**: `Failed to fetch from http://localhost:8080/cacodev/api/...`

**Solution**:
1. Verify backend API is running
2. Check API URL in `environment.ts`
3. Verify CORS is enabled on backend
4. Check network tab in DevTools

#### 5. Authentication Token Issues

```typescript
// Manually set token for testing
localStorage.setItem('token', 'your-jwt-token');

// Or use API to get valid token
curl -X POST http://localhost:8080/cacodev/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'
```

#### 6. CORS Errors

**Error**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution**: Ensure backend has CORS configured:
```java
// In backend Spring config
@Configuration
public class WebConfig implements WebMvcConfigurer {
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
      .allowedOrigins("http://localhost:4200")
      .allowedMethods("*")
      .allowCredentials(true);
  }
}
```

#### 7. Build Size Too Large

**Error**: `Error: budgets of 500kB exceeded`

**Solution**:
```bash
# Analyze bundle
ng build --stats-json
webpack-bundle-analyzer dist/cacodev-ui/stats.json

# Enable lazy loading for feature modules
# Check for large third-party libraries
npm list | grep -i [library-name]
```

#### 8. SSR Build Failures

```bash
# Rebuild with SSR debugging
ng build --configuration production
npm run build -- --verbose

# Check server logs
npm run serve:ssr:cacodev-ui
```

### Debug Mode

```bash
# Enable debugging
ng serve --source-map

# In browser DevTools (F12):
# Sources tab -> set breakpoints
# Console tab -> check for errors
# Network tab -> verify API calls
```

### Performance Debugging

```bash
# Lighthouse audit in Chrome DevTools
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Click "Analyze page load"

# Check Core Web Vitals
# Monitor performance in Production
```

## 📚 Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular Material Documentation](https://material.angular.io/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [Angular Performance Guide](https://angular.io/guide/performance-best-practices)

## 📝 Environment Variables

Create a `.env` file in the project root (excluded from version control):

```
ANGULAR_API_URL=http://localhost:8080/cacodev/api
STRIPE_PUBLIC_KEY=<your-stripe-publishable-key>
NODE_ENV=development
```

**Important**: 
- Replace `<your-stripe-publishable-key>` with your actual Stripe publishable key
- Never commit this file to version control
- Use `.env` for local development (add to `.gitignore`)
- Use secure environment variables on production servers

## 🔐 Security Considerations

- Never commit sensitive data (API keys, secrets)
- Use environment variables for configuration
- Validate all user inputs
- Sanitize HTML content with Angular's DomSanitizer
- Implement HTTPS in production
- Use security headers (CSP, X-Frame-Options, etc.)
- Keep dependencies updated for security patches

## 📄 License

This project is part of CACODEV and follows project licensing guidelines.

## 👥 Support

For issues, questions, or contributions, please contact the development team or open an issue in the project repository.

---

**Last Updated**: May 4, 2026  
**Project Version**: 0.0.0  
**Angular Version**: 19.1.0
