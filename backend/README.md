# CACODEV Shalom API - Backend

A comprehensive Spring Boot 3.4.4 REST API for the CACODEV Shalom platform, providing features for member management, donations, events, contributions, payments, and AI-powered capabilities.

## 📋 Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Features](#features)
- [Database Setup](#database-setup)
- [Development](#development)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

CACODEV Shalom API is a comprehensive backend service built with Spring Boot 3.4.4 that powers the CACODEV Shalom community platform. The application is designed to facilitate meaningful community engagement through member management, donation processing, event coordination, and AI-enhanced interactions.

### What is CACODEV Shalom?

CACODEV Shalom is a community-driven platform built on the Hebrew word "Shalom" (peace/wholeness), aimed at fostering connection, contribution, and compassion within communities. The platform enables organizations to:

- **Build Community**: Manage members, track participation, and foster meaningful relationships
- **Enable Giving**: Process donations seamlessly with secure payment integration (Stripe)
- **Organize Events**: Schedule, coordinate, and track community events and activities
- **Recognize Contributions**: Track and acknowledge member contributions to community initiatives
- **Enhance Conversations**: Leverage AI-powered features to provide intelligent assistance and support

### Key Capabilities

The API provides a full-featured backend service with:

- **User Authentication & Authorization**: Secure JWT-based authentication with role-based access control
- **Member Management**: Comprehensive member profiles with status tracking and auto-generated member IDs
- **Donation System**: One-time and recurring donation processing integrated with Stripe
- **Event Management**: Complete event lifecycle management with CRUD operations and participation tracking
- **Contribution Tracking**: Record and recognize community contributions and member involvement
- **Payment Processing**: Secure payment handling with webhook integration for real-time transaction updates
- **AI Integration**: OpenAI-powered chat capabilities for intelligent community support

The API follows RESTful principles with comprehensive error handling, security measures, and full OpenAPI/Swagger documentation for easy integration with frontend applications.

## 🛠 Technology Stack

### Core Framework
- **Spring Boot**: 3.4.4
- **Java**: 17
- **Maven**: Project build automation

### Data & Persistence
- **Spring Data JPA**: ORM and database abstraction
- **Hibernate**: Object-relational mapping
- **SQL Server**: Primary database
- **JDBC**: Database connectivity

### Security & Authentication
- **Spring Security**: Authentication and authorization framework
- **JWT (JJWT 0.12.6)**: Token-based authentication
  - Access Token: 24 hours expiration
  - Refresh Token: 7 days expiration

### Integration Services
- **Stripe Java SDK (26.2.0)**: Payment processing and webhooks
- **Spring AI (1.0.0)**: OpenAI integration for AI-powered features
- **OpenAI GPT-4o-mini**: Language model API

### Utilities & Tools
- **MapStruct (1.6.3)**: DTO mapping and entity transformation
- **Lombok (1.18.36)**: Boilerplate code reduction
- **SpringDoc OpenAPI (2.8.5)**: Swagger/OpenAPI documentation

### Testing
- **JUnit 5**: Unit testing framework
- **Spring Test**: Integration testing
- **Spring Security Test**: Security testing utilities

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK)**: Version 17 or higher
  - Download from: https://www.oracle.com/java/technologies/downloads/
  - Verify: `java -version`

- **Maven**: Version 3.8.0 or higher
  - Download from: https://maven.apache.org/download.cgi
  - Verify: `mvn --version`

- **SQL Server**: Version 2019 or later
  - Download from: https://www.microsoft.com/en-us/sql-server/
  - Or use SQL Server LocalDB for development

- **IDE** (recommended):
  - IntelliJ IDEA Ultimate/Community
  - VS Code with Java extensions
  - Eclipse IDE

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
# Clone the CACODEV backend repository
git clone <repository-url> cacodev-backend
cd cacodev-backend
```

### 2. Install Dependencies

```bash
mvn clean install
```

This will download and install all project dependencies as defined in `pom.xml`.

### 3. Create Database

Create a new SQL Server database for the application. Replace `YOUR_SECURE_PASSWORD` with a strong password:

```sql
CREATE DATABASE CacodevDB;
GO

-- Create application user with a strong password
CREATE LOGIN CacodevAppUser WITH PASSWORD = 'YOUR_SECURE_PASSWORD';
GO

USE CacodevDB;
CREATE USER CacodevAppUser FOR LOGIN CacodevAppUser;
GRANT CONTROL ON DATABASE::CacodevDB TO CacodevAppUser;
GO
```

**Important**: Store the database password securely. You'll need it for the `DB_PASSWORD` environment variable.

## ⚙️ Configuration

### Environment Setup

Create or update the following environment variables with your actual keys:

**Windows (PowerShell):**
```powershell
# JWT Configuration - Generate a secure base64-encoded secret
[Environment]::SetEnvironmentVariable("JWT_SECRET", "<your-base64-secret-key>", "User")

# Stripe Configuration - Obtain from Stripe Dashboard
[Environment]::SetEnvironmentVariable("STRIPE_SECRET_KEY", "<your-stripe-secret-key>", "User")
[Environment]::SetEnvironmentVariable("STRIPE_WEBHOOK_SECRET", "<your-stripe-webhook-secret>", "User")

# OpenAI Configuration - Obtain from OpenAI Platform
[Environment]::SetEnvironmentVariable("OPENAI_API_KEY", "<your-openai-api-key>", "User")

# Database Configuration
[Environment]::SetEnvironmentVariable("DB_PASSWORD", "<your-secure-database-password>", "User")
```

**Windows (CMD):**
```cmd
setx JWT_SECRET <your-base64-secret-key>
setx STRIPE_SECRET_KEY <your-stripe-secret-key>
setx STRIPE_WEBHOOK_SECRET <your-stripe-webhook-secret>
setx OPENAI_API_KEY <your-openai-api-key>
setx DB_PASSWORD <your-secure-database-password>
```

> **⚠️ Security Warning**: Never commit these environment variables or their values to version control. Always use a `.env` file (excluded from git) or your system's environment variable management.

### Application Configuration

Edit `src/main/resources/application.yml`:

```yaml
spring:
  application:
    name: CACODEV API
    version: 1.0.0
  
  datasource:
    url: jdbc:sqlserver://localhost:1433;encrypt=true;trustServerCertificate=true
    username: CacodevAppUser
    password: ${DB_PASSWORD}
    driver-class-name: com.microsoft.sqlserver.jdbc.SQLServerDriver
  
  jpa:
    hibernate:
      ddl-auto: update  # Or 'validate' for production
  
  ai:
    openai:
      api-key: ${OPENAI_API_KEY}
      chat:
        options:
          model: gpt-4o-mini

stripe:
  api-key: ${STRIPE_SECRET_KEY}
  webhook-secret: ${STRIPE_WEBHOOK_SECRET}
  success-url: http://localhost:4200/payment/success?session_id={CHECKOUT_SESSION_ID}
  cancel-url: http://localhost:4200/payment/cancel

jwt:
  secret: ${JWT_SECRET}
  access-token-expiration: 86400000    # 24 hours in milliseconds
  refresh-token-expiration: 604800000  # 7 days in milliseconds

server:
  port: 8080
  servlet:
    context-path: /cacodev
```

### Environment Variables Reference

| Variable | Source | Description |
|----------|--------|-------------|
| `JWT_SECRET` | Generate | Base64-encoded 256-bit secret for JWT signing |
| `STRIPE_SECRET_KEY` | Stripe Dashboard | Secret API key from Stripe (sk_test_... or sk_live_...) |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard | Webhook signing secret (whsec_...) |
| `OPENAI_API_KEY` | OpenAI Platform | API key for OpenAI services |
| `DB_PASSWORD` | Your Setup | SQL Server database password |

### API Keys Setup

#### Stripe Setup
1. Create a Stripe account at https://stripe.com
2. Navigate to Developers > API keys
3. Copy your Secret Key (sk_test_...)
4. In Dashboard > Developers > Webhooks, add:
   - URL: `http://localhost:8080/cacodev/api/webhooks/stripe`
   - Events: `charge.succeeded`, `charge.failed`, `checkout.session.completed`
5. Copy the Webhook Signing Secret (whsec_...)

#### OpenAI Setup
1. Visit https://platform.openai.com
2. Create an API key in your account settings
3. Set it in `OPENAI_API_KEY` environment variable

#### JWT Secret Generation
```powershell
# Generate a Base64-encoded 256-bit secret for JWT_SECRET
# Can be generated using various methods:
# Option 1: Using PowerShell
$secret = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).ToString() + (New-Guid).ToString()))
Write-Host $secret

# Option 2: Using OpenSSL
# openssl rand -base64 32

# Option 3: Using an online tool (not recommended for production)
# Copy the generated value to JWT_SECRET environment variable
```

## 🚀 Running the Application

### Development Mode

```bash
# Using Maven
mvn spring-boot:run

# Or using Maven directly with active profile
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=local"
```

The application will start on `http://localhost:8080/cacodev`

### IDE Integration

**IntelliJ IDEA:**
1. Open the project in IntelliJ
2. Right-click on `ShalomApplication.java`
3. Select "Run 'ShalomApplication.main()'" or press Shift+F10

**Visual Studio Code:**
1. Install "Extension Pack for Java"
2. Open the debug view (Ctrl+Shift+D)
3. Click "Run" or press F5

## 📚 API Documentation

### Swagger UI

Once the application is running, access the interactive API documentation:

- **Swagger UI**: http://localhost:8080/cacodev/swagger-ui.html
- **API Docs (JSON)**: http://localhost:8080/cacodev/v3/api-docs
- **API Docs (YAML)**: http://localhost:8080/cacodev/v3/api-docs.yaml

### Key API Endpoints

**Authentication**
- `POST /cacodev/api/auth/register` - User registration
- `POST /cacodev/api/auth/login` - User login
- `POST /cacodev/api/auth/refresh` - Refresh access token

**Members**
- `GET /cacodev/api/members` - List all members
- `GET /cacodev/api/members/{id}` - Get member details
- `POST /cacodev/api/members` - Create new member
- `PUT /cacodev/api/members/{id}` - Update member
- `DELETE /cacodev/api/members/{id}` - Delete member

**Donations**
- `GET /cacodev/api/donations` - List donations
- `POST /cacodev/api/donations` - Create donation
- `GET /cacodev/api/donations/{id}` - Get donation details

**Events**
- `GET /cacodev/api/events` - List events
- `POST /cacodev/api/events` - Create event
- `GET /cacodev/api/events/{id}` - Get event details

**Payments**
- `POST /cacodev/api/payments/checkout` - Create Stripe checkout session
- `POST /cacodev/api/webhooks/stripe` - Stripe webhook handler

**AI Features**
- `POST /cacodev/api/ai/chat` - AI chat endpoint

## 📂 Project Structure

```
src/main/java/com/cacodev/shalom/
├── ShalomApplication.java              # Main application class
├── common/
│   └── ErrorDTO.java                   # Error response model
│   └── base/
│       └── BaseEntity.java             # Base JPA entity
├── config/
│   ├── database/
│   │   └── DatabaseConfig.java         # Database configuration
│   ├── security/
│   │   ├── ApplicationConfig.java      # Security beans configuration
│   │   ├── JwtAuthenticationFilter.java # JWT authentication filter
│   │   ├── JwtService.java             # JWT token operations
│   │   └── SecurityConfig.java         # Spring Security configuration
│   ├── stripe/
│   │   └── StripeConfig.java           # Stripe API configuration
│   └── web/
│       ├── OpenApiConfig.java          # Swagger/OpenAPI setup
│       └── WebConfig.java              # CORS and web configuration
├── exceptions/
│   ├── GlobalExceptionHandler.java     # Centralized exception handling
│   ├── ResourceAlreadyExistsException.java
│   └── ResourceNotFound.java
├── features/
│   ├── ai/
│   │   ├── AiController.java           # AI feature endpoints
│   │   └── AiService.java              # AI feature business logic
│   ├── contribution/
│   │   ├── controller/
│   │   ├── domain/
│   │   ├── dto/
│   │   ├── mapper/
│   │   ├── repository/
│   │   └── service/
│   ├── donation/
│   │   ├── Donation.java               # Donation entity
│   │   └── DonationFrequency.java      # Enum for donation frequency
│   ├── event/
│   │   ├── controller/
│   │   ├── domain/
│   │   ├── dto/
│   │   ├── mapper/
│   │   ├── repository/
│   │   └── service/
│   ├── member/
│   │   ├── controller/
│   │   ├── domain/
│   │   ├── dto/
│   │   ├── mapper/
│   │   ├── repository/
│   │   └── service/
│   ├── payment/
│   │   ├── controller/
│   │   ├── domain/
│   │   ├── dto/
│   │   ├── mapper/
│   │   ├── repository/
│   │   └── service/
│   └── user/
│       ├── controller/
│       ├── domain/
│       ├── dto/
│       ├── mapper/
│       ├── repository/
│       └── service/
├── seed/
│   └── DataInitializer.java            # Database seed/init data
└── utils/
    └── MemberIdGenerator.java          # Member ID generation utility

src/main/resources/
├── application.yml                     # Application configuration
└── banner.txt                          # Application startup banner

src/test/
└── java/com/cacodev/shalom/
    └── ShalomApplicationTests.java     # Integration tests
```

### Feature Modules Organization

Each feature module follows a consistent structure:

```
feature/
├── controller/        # REST endpoints
├── domain/           # Entity models
├── dto/              # Data Transfer Objects (Request/Response)
├── mapper/           # MapStruct entity-DTO mappers
├── repository/       # Data access layer (JPA repositories)
└── service/          # Business logic layer
```

## ✨ Features

### Authentication & Security
- JWT-based authentication
- Access and refresh token system
- Spring Security integration
- Role-based access control (RBAC) ready
- Password encryption with BCrypt

### User Management
- User registration and login
- Profile management
- Account security settings
- User roles and permissions

### Member Management
- Member profiles with auto-generated IDs
- Member status tracking
- Gender field support
- Member information management

### Donation System
- One-time and recurring donations
- Donation frequency management
- Donation tracking and history
- Integration with payment system

### Event Management
- Event creation and scheduling
- Event details and descriptions
- Event management with CRUD operations
- Event participation tracking

### Contribution System
- Track community contributions
- Contribution history and statistics
- Contribution validation and management

### Payment Processing
- Stripe checkout session creation
- Webhook integration for payment events
- Payment status tracking
- Transaction history

### AI Features
- OpenAI GPT-4o-mini integration
- AI chat capabilities
- Extensible AI service architecture

### Data Management
- Automatic schema generation (Hibernate DDL)
- Database migration with Hibernate
- Seed data initialization
- Transaction management

## 🗄️ Database Setup

### Schema Generation

The application automatically creates database schema on startup using Hibernate's `ddl-auto` setting:

- **Development**: `update` - Creates and modifies tables as needed
- **Production**: `validate` - Only validates existing schema

### Manual Schema Creation (Optional)

To manually create schema before running the application:

```bash
# Export the DDL from JPA
mvn hibernate5:export
```

### Database Utilities

```powershell
# Connect to SQL Server
# Using SQL Server Management Studio (SSMS) or sqlcmd
sqlcmd -S localhost -U CacodevAppUser

# Create backup
BACKUP DATABASE CacodevDB TO DISK = '<path-to-backup>\CacodevDB.bak';
GO
```

## 👨‍💻 Development

### Adding New Features

To add a new feature module:

1. Create directory structure under `src/main/java/com/cacodev/shalom/features/[feature-name]`
2. Implement the following components:
   - **Entity** (domain)
   - **Repository** (extends JpaRepository)
   - **DTO** (request/response models)
   - **Mapper** (MapStruct interface)
   - **Service** (business logic)
   - **Controller** (REST endpoints)

3. Example structure:
```java
// Entity
@Entity
@Table(name = "features")
public class Feature extends BaseEntity {
    @Column(nullable = false)
    private String name;
    // ... fields and getters/setters
}

// Repository
@Repository
public interface FeatureRepository extends JpaRepository<Feature, Long> {
    Optional<Feature> findByName(String name);
}

// DTO
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeatureDTO {
    private Long id;
    private String name;
}

// Mapper
@Mapper(componentModel = "spring")
public interface FeatureMapper {
    FeatureDTO toDTO(Feature entity);
    Feature toEntity(FeatureDTO dto);
}

// Service
@Service
@RequiredArgsConstructor
public class FeatureService {
    private final FeatureRepository repository;
    private final FeatureMapper mapper;
    
    public List<FeatureDTO> getAllFeatures() {
        return repository.findAll()
            .stream()
            .map(mapper::toDTO)
            .collect(Collectors.toList());
    }
}

// Controller
@RestController
@RequestMapping("/api/features")
@RequiredArgsConstructor
public class FeatureController {
    private final FeatureService service;
    
    @GetMapping
    public ResponseEntity<List<FeatureDTO>> getAllFeatures() {
        return ResponseEntity.ok(service.getAllFeatures());
    }
}
```

### Code Style Guidelines

- Follow Google Java Style Guide
- Use meaningful variable names
- Document complex logic with comments
- Use annotations appropriately (e.g., @NotNull, @Valid)
- Keep methods focused and single-responsibility

### Build & Compilation

```bash
# Clean build
mvn clean build

# Skip tests during build
mvn clean build -DskipTests

# Run specific Maven goal
mvn compile
mvn package
```

## 🧪 Testing

### Run All Tests

```bash
mvn test
```

### Run Specific Test Class

```bash
mvn test -Dtest=ShalomApplicationTests
```

### Run Tests with Coverage

```bash
mvn test jacoco:report
# View report at: target/site/jacoco/index.html
```

### Test Organization

- Unit tests: Located in `src/test/java`
- Test naming convention: `[ClassName]Tests.java`
- Integration tests: Use `@SpringBootTest`
- Service layer tests: Mock repositories with Mockito

## 🔍 Troubleshooting

### Common Issues

#### 1. Database Connection Failure

**Error**: `com.microsoft.sqlserver.jdbc.SQLServerException: Login failed`

**Solution**:
1. Verify SQL Server is running
2. Check connection settings in `application.yml`:
   - Verify host and port are correct
   - Ensure database name is correct
   - Verify username matches created user
3. Ensure database and user are created (see [Create Database](#3-create-database) section)
4. Verify `DB_PASSWORD` environment variable is set with the correct password
5. Test connection using SQL Server Management Studio or sqlcmd

#### 2. JWT Secret Not Set

**Error**: `Cannot set property 'secret' to null`

**Solution**:
1. Ensure `JWT_SECRET` environment variable is set with a valid base64-encoded secret
2. Generate a new secret if needed (see [JWT Secret Generation](#jwt-secret-generation) section)
3. Restart the application after setting the variable
4. Verify the variable is set correctly:
```bash
# PowerShell - verify environment variable
$Env:JWT_SECRET

# CMD - verify environment variable
echo %JWT_SECRET%
```

#### 3. Stripe Webhook Integration Issues

**Error**: `Invalid signature or webhook secret mismatch`

**Solution**:
1. Verify `STRIPE_WEBHOOK_SECRET` is set correctly
2. Ensure the webhook URL in Stripe dashboard matches your application
3. Test webhook using Stripe CLI:
```bash
# Install Stripe CLI from https://stripe.com/docs/stripe-cli
stripe listen --forward-to localhost:8080/cacodev/api/webhooks/stripe
```

#### 4. OpenAI API Errors

**Error**: `Unauthorized or invalid API key`

**Solution**:
1. Verify `OPENAI_API_KEY` is set correctly
2. Check API key hasn't expired or been revoked
3. Verify you have API usage quota available
4. Check account has payment method on file

#### 5. Port Already in Use

**Error**: `Address already in use: localhost:8080`

**Solution**:
```bash
# Option 1: Kill process on port 8080
netstat -ano | findstr :8080
taskkill /PID [PID] /F

# Option 2: Change port in application.yml
server:
  port: 8081
```

#### 6. Maven Build Failures

**Error**: `BUILD FAILURE`

**Solution**:
```bash
# Clear Maven cache
mvn clean install -U

# Check Java version
java -version  # Should be 17+

# Check Maven version
mvn --version  # Should be 3.8.0+
```

### Logs & Debugging

Check application logs for detailed error information:

```bash
# Logs are typically in:
# logs/application.log (if configured)
# or console output

# Enable debug logging
logging:
  level:
    root: debug
    com.cacodev.shalom: debug
```

### Health Check

Verify application is running correctly:

```bash
curl http://localhost:8080/cacodev/actuator/health
```

## 📝 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA Guide](https://spring.io/projects/spring-data-jpa)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [SQL Server Documentation](https://docs.microsoft.com/en-us/sql/sql-server/)

## 📄 License

This project is part of CACODEV and follows project licensing guidelines.

## 👥 Support

For issues, questions, or contributions, please contact the development team or open an issue in the project repository.

---

**Last Updated**: May 4, 2026  
**Project Version**: 0.0.1-SNAPSHOT








