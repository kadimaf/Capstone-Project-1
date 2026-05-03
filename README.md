# P445 Project

## Table of Contents (Optional)

- [Overview](#Overview)
- [Features & Modules](#Features-&-Modules)
- [Technology Stack](#Technology-Stack)
- [Project Structure](#Projet-Structure)
- [Installation & Setup](#Installation-&-Setup)
- [Documentation](#Documentation)
- [Contributing](#Contributing)
- [License](#License)

---

﻿# **CACODEV - Congolese Association for Congo Development**

*A Non-Profit Organization Management System*

## **Overview**
CACODEV is a comprehensive, full-stack nonprofit organization management system designed to centralize and streamline operations such as member management, event coordination, financial contributions, and organizational communication.

The platform replaces fragmented manual processes with a **secure, scalable, and user-friendly web-based solution**, enabling real-time access to data, improved workflows, and enhanced transparency.

The system integrates modern technologies including **Angular, Spring Boot, SQL Server, Stripe, and AI-powered assistance** to deliver a unified and intelligent management experience.

---

## **Features & Modules**

### 1. **Authentication & Access Control**
- Secure login and registration
- JWT-based authentication
- Role-Based Access Control (RBAC)

### 2. **Member Management**
- Add, edit, delete members
- Track membership status (active/inactive/expired)
- Manage membership types and roles

### 3. **Event Management**
- Create and manage events
- Register participants
- Track event status (Scheduled, Started, Completed, Cancelled)

### 4. **Contributions & Donations**
- Record contributions (cash, service, items)
- Secure online donations via Stripe
- Transaction confirmation and history tracking

### 5. **Payment Processing**
- Stripe integration for secure payments
- Checkout session handling
- Webhook-based payment verification

### 6. **AI Assistant**
- Interactive AI-powered chat interface
- Real-time responses to user queries
- Helps with system navigation and data understanding
- **Chat history management (including delete functionality)**

### 7. **Dashboard & Analytics**
- Real-time statistics:
- - Total Members
- - Active Members
- - Contributions
- - Events
- Quick navigation and action shortcuts

### 8. **Contact System**
- Built-in contact form for user inquiries
- Direct communication with administrators
- Message tracking and support handling

### 9. **About Section**
- Organization mission, vision, and values
- Historical overview and milestones

### 10. **Donation Module**
- Simple and secure donation workflow
- Stripe-powered checkout
- Immediate confirmation and tracking
---

## **Technology Stack**

### **Backend**: Spring Boot 3.x
- **Spring Security** – Authentication & Authorization
- **Spring Data JPA** – Database Management
- **Spring MVC** – API Development
- **Stripe API** – Payment Processing
- **Hibernate** – ORM
- **RESTful API Architecture**

### **Frontend**: Angular 19
- **Angular Material** – UI Components
- **Bootstrap 5**
- **RxJS** – Reactive Programming
- **NgRx** – State Management
- **Angular Forms** – Form Handling

### **Database**
- Microsoft SQL Server
- JPA/Hibernate ORM Mapping

### ** External Integrations**
- Stripe API (Payments)
- OpenAi API (Ai Assistant)

### **DevOps & Deployment**
- **Maven** (Build Tool)
- **Node.js 20+**
- **Docker** – Containerization
- **GitHub** (Version Control)
- **CI/CD Pipelines** – Automated Builds & Deployment
- **Cloud Hosting** – AWS / Azure / Google Cloud

---

## Project Structure
TeamName/
│
├── README.md
├── INSTALL.md
│
├── DesignDocs/
│   └── SoftwareDesignDescription.pdf
│
├── ImplementationDocs/
│   ├── ProgrammerManual.pdf
│   ├── UsersManual.pdf
│   └── TrainingMaterials.pdf
│
├── Src/
│   ├── backend/
│   ├── frontend/
│   └── database/
│       └── empty_schema.sql
│
└── docs/
    ├── RS-6_TestPlan.pdf
    ├── RS-7_TestCases.pdf
    └── RS-8_TestSummary.pdf
    ├── RS-9_ProgrammerManual.pdf
    ├── RS-11_FurtherDevelopmentStatement.pdf
    └── Poster.pptx

---

## **Installation & Setup**
#### **Prerequisites**
- Java 17 LTS
- Node.js 20+
- Apache Maven 3.9+
- Microsoft SQL Server
- Stripe API Key
- OpenAi API Key

---
### **1. Backend (Spring Boot)**
#### Steps:
```bash git clone https://github.com/cacodev/cacodev.git
cd cacodev/backend
mvn clean install
mvn spring-boot:run
```
### Baackend Configuration (application.yml)
```
#### Environment Variables:
```env
spring:
  datasource:
    url: jdbc:sqlserver://localhost:5432;databaseName=cacodev_db
    username: YOUR_DB_USERNAME
    password: YOUR_DB_PASSWORD

stripe:
  secret-key: YOUR_STRIPE_KEY

openai:
  api-key: YOUR_OPENAI_KEY
```
---

### **2. Frontend (Angular)**
#### Steps:
```bash
git clone https://github.com/your-repo/cacodev-frontend.git
cd cacodev-frontend
npm install
ng serve
```
#### Access Application
The app should now be running at `http://localhost:4200/`.

---

## Documentation
The project includes comprehensive documentation:
- Software Design Description (SDD)
- Programmer Manual
- User Manual
- Training Materials
- Test Plan, Test Cases, Test Summary
These documents enable:
- Full system understanding
- Easy onboarding for new developers
- Complete reproducibility of the system

## **Contributing**
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m "Added new feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Submit a Pull Request

---

## **Group Shalom**
1. David Katembo - Frontend Development & UI/UX
2. Fabrice Kadima - Backend Development & System Integration
3. Pemphyle Nzuzi - AI Integration, Testing & Documentation

---

## **License**
This project is licensed under the **MIT License**.

---
CACODEV provides a complete, scalable, and intelligent nonprofit management solution, combining modern web technologies with AI capabilities to improve efficiency, transparency, and user experience.
- [P445 & 446 Project](#P445 & 446-Project)
 ---
