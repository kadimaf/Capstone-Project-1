# P445 Project

## Table of Contents (Optional)

- [Overview](#Overview)
- [Features & Modules](#Features-&-Modules)
- [Technology Stack](#Technology-Stack)
- [Installation & Setup](#Installation-&-Setup)
- [Contributing](#Contributing)
- [License](#License)

---

﻿# **CACODEV - Congolese Association for Congo Development**

*A Non-Profit Organization Management System*

## **Overview**
CACODEV is a comprehensive management platform designed to facilitate the operations of the Congolese Association for Congo Development. Built with **Spring Boot** (Backend) and **Angular** (Frontend), the system provides tools to manage activities, memberships, fundraisings, events, meetings, and more.

---

## **Features & Modules**

### **1. Activities**
Manage and categorize activities within the organization.
- Activity Domain
- Activity Domain Category (with images)
- Activity
- Activity Registration

### **2. Billing**
Implement **Stripe** for processing **membership contributions**.

### **3. Blogs**
Manage blog-related content and discussions.
- Authors
- Blog Posts
- Post Comments & Replies

### **4. Contacts**
Centralized communication management.
- Announcements
- Contact Management

### **5. Events**
Organize and track events.
- Event Creation
- Event Locations
- Event Registration

### **6. Fundraisings**
Monitor and manage donations.
- Donations
- Donor Members & Their Contributions
- Fundraising Campaigns

### **7. Identity & Access Control**
Manage users and authentication.
- User Accounts
- Roles & Permissions
- User Tokens
- User Addresses

### **8. Meetings**
Schedule and document meetings.
- Meeting Management
- Attendees Tracking
- Meeting Minutes & Categories
- Meeting Motions

### **9. Memberships**
Manage members and board roles.
- Board Members
- Membership Types
- Member Contributions
- Job Roles & Histories

### **10. Organizations**
Handle organizational structure.
- General Organization Information
- Announcements
- Documents
- Locations & Contacts
- Representatives

---

## **Technology Stack**

### **Backend**: Spring Boot
- **Spring Security** – Authentication & Authorization
- **Spring Data JPA** – Database Management
- **Spring MVC** – API Development
- **Stripe API** – Payment Processing
- **Hibernate** – ORM

### **Frontend**: Angular
- **Angular Material** – UI Components
- **RxJS** – Reactive Programming
- **NgRx** – State Management
- **Angular Forms** – Form Handling

### **Database**
- PostgreSQL / MySQL

### **DevOps & Deployment**
- **Docker** – Containerization
- **CI/CD Pipelines** – Automated Builds & Deployment
- **Cloud Hosting** – AWS / Azure / Google Cloud

---

## **Installation & Setup**

### **1. Backend (Spring Boot)**
#### Prerequisites:
- Java 17+
- Maven
- PostgreSQL/MySQL

#### Steps:
```bash
git clone https://github.com/your-repo/cacodev-backend.git
cd cacodev-backend
mvn clean install
mvn spring-boot:run
```
#### Environment Variables:
```env
DB_URL=jdbc:postgresql://localhost:5432/cacodev_db
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
STRIPE_SECRET_KEY=your_stripe_secret
JWT_SECRET=your_jwt_secret
```

---

### **2. Frontend (Angular)**
#### Prerequisites:
- Node.js 18+
- Angular CLI

#### Steps:
```bash
git clone https://github.com/your-repo/cacodev-frontend.git
cd cacodev-frontend
npm install
ng serve
```
The app should now be running at `http://localhost:4200/`.

---

## **Contributing**
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m "Added new feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Submit a Pull Request

---

## **License**
This project is licensed under the **MIT License**.

---
- [C346 Project](#C346-Project)
 ---
