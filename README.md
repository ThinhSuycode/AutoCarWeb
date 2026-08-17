# 🚗 AutoCarWeb — Fullstack Automotive Platform

> A fullstack web application for automotive businesses, providing car browsing, car management, customer management, service appointments, contact management, articles, authentication, and role-based administration.

**AutoCarWeb** is a fullstack web application developed to simulate a real-world automotive dealership and service management platform.

The project focuses on building a complete system from **Frontend → RESTful API → Database → Authentication → Cloud Storage → Docker → Deployment**, with a clear separation between customer-facing features and internal management features.

---

## 📌 Project Overview

AutoCarWeb is designed for an automotive business that needs to manage:

* 🚘 Cars and car details
* 👤 Customers and users
* 📅 Service appointments
* 📞 Customer contacts
* 👨‍💼 Staff assignment
* 📰 Automotive articles
* 🔐 Authentication and authorization
* ☁️ Car and article images
* 📊 Management workflows

The application provides different experiences depending on the user's role.

### Customer

Customers can:

* Browse available cars
* Search and filter cars
* View detailed car information
* Read automotive articles
* Register and log in
* Make service appointments
* Request consultations
* Submit contact requests
* View appointment history
* Manage their account

### Staff

Staff members can:

* View assigned customer contacts
* Manage contact statuses
* Handle customer requests
* Follow up with customers
* Manage assigned contacts

### Admin

Administrators can:

* Manage users
* Manage cars
* Manage car details
* Manage articles
* Manage customer contacts
* Assign contacts to staff
* Manage appointment information
* Monitor business data

---

# 🎯 Project Goals

The main goal of this project is to build a realistic fullstack application rather than a simple CRUD demo.

The project focuses on:

* Building reusable React components
* Developing RESTful APIs with Node.js and Express
* Designing MongoDB schemas with Mongoose
* Implementing JWT authentication
* Implementing role-based authorization
* Managing asynchronous server state with React Query
* Validating data using Zod
* Uploading images using Cloudinary
* Containerizing the backend with Docker
* Using environment variables for configuration
* Applying Git/GitHub workflow
* Preparing the application for production deployment

---

# 🛠️ Tech Stack

## Frontend

| Technology      | Purpose                                 |
| --------------- | --------------------------------------- |
| React           | Building user interfaces                |
| TypeScript      | Type safety                             |
| Vite            | Frontend development and build tool     |
| React Router    | Client-side routing                     |
| React Query     | Server-state management and API caching |
| Axios           | HTTP requests                           |
| React Hook Form | Form management                         |
| Zod             | Form and data validation                |
| SCSS            | Styling                                 |
| classnames/bind | Dynamic CSS Modules classes             |
| react-hot-toast | User notifications                      |

---

## Backend

| Technology | Purpose                       |
| ---------- | ----------------------------- |
| Node.js    | JavaScript runtime            |
| Express.js | REST API framework            |
| TypeScript | Type safety                   |
| Mongoose   | MongoDB ODM                   |
| JWT        | Authentication                |
| bcrypt     | Password hashing              |
| Multer     | File upload handling          |
| Cloudinary | Image storage                 |
| CORS       | Cross-origin request handling |
| dotenv     | Environment configuration     |

---

## Database & Infrastructure

| Technology     | Purpose                  |
| -------------- | ------------------------ |
| MongoDB        | Main database            |
| MongoDB Atlas  | Cloud MongoDB hosting    |
| Cloudinary     | Image/file storage       |
| Docker         | Backend containerization |
| Git            | Version control          |
| GitHub         | Source code management   |
| GitHub Actions | CI/CD automation         |
| Vercel         | Frontend deployment      |
| Render         | Backend deployment       |

---

# 🏗️ System Architecture

```text
                        ┌─────────────────────┐
                        │       Client        │
                        │   React + Vite      │
                        │    TypeScript       │
                        └──────────┬──────────┘
                                   │
                                   │ HTTP / REST API
                                   ▼
                        ┌─────────────────────┐
                        │      Backend        │
                        │ Node.js + Express   │
                        │    TypeScript       │
                        └──────────┬──────────┘
                                   │
                ┌──────────────────┼──────────────────┐
                │                  │                  │
                ▼                  ▼                  ▼
        ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
        │   MongoDB    │   │  Cloudinary  │   │     JWT      │
        │   Database   │   │    Images    │   │     Auth     │
        └──────────────┘   └──────────────┘   └──────────────┘
                                   │
                                   ▼
                           ┌───────────────┐
                           │     Docker    │
                           │   Container   │
                           └───────────────┘
```

---

# 📂 Project Structure

The project is separated into frontend and backend applications.

```text
AutoCarWeb/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── queries/
│   │   ├── services/
│   │   ├── types/
│   │   ├── schemas/
│   │   ├── utils/
│   │   ├── assets/
│   │   └── ...
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── schemas/
│   │   ├── utils/
│   │   ├── types/
│   │   └── ...
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── Dockerfile
├── docker-compose.yml
├── .gitignore
└── README.md
```

> The exact folder structure may evolve as the project is refactored.

---

# ✨ Main Features

## 🚘 Car Management

The car management system provides functionality for:

* Create car
* Update car
* Delete car
* View car details
* Search cars
* Filter cars
* Pagination
* Manage car images
* Manage detailed specifications
* Assign responsible staff/manager

Example car information includes:

```text
Brand
Model
Price
Year
Fuel type
Transmission
Mileage
Color
Images
Specifications
Description
Management information
```

---

# 🔎 Car Search & Filtering

The frontend provides a search and filtering experience for customers.

Supported concepts include:

* Keyword search
* Pagination
* Dynamic filters
* Server-side data fetching
* Loading states
* Empty states

The application uses **React Query** to manage server state and API caching.

Example query structure:

```text
GET /cars
GET /cars?page=1&limit=10
GET /cars?search=Toyota
```

---

# 📄 Car Details

Customers can view detailed information about a vehicle.

The detail page can display:

* Car images
* Basic information
* Technical specifications
* Pricing
* Description
* Related information
* Contact/appointment actions

The page is designed to separate data-fetching logic from UI components.

---

# 📅 Appointment Management

Customers can submit appointments for different services.

Example service types:

```text
Test Drive
Consultation
Maintenance
Inspection
```

The appointment workflow allows the system to store customer requests and manage their status.

Example workflow:

```text
Customer
   ↓
Create Appointment
   ↓
Backend API
   ↓
MongoDB
   ↓
Staff/Admin
   ↓
Process Appointment
   ↓
Update Status
```

---

# 📞 Contact Management

The system includes a customer contact management workflow.

Contacts can contain information such as:

```text
Customer
Car
Contact information
Request
Status
Assigned staff
Created date
```

Administrators can assign contacts to staff members.

Example workflow:

```text
Customer submits contact
          ↓
       Contact
          ↓
       Admin
          ↓
   Assign Staff
          ↓
       Staff
          ↓
Handle customer request
```

---

# 👨‍💼 Role-Based Access Control

The application supports multiple user roles.

```text
USER
 ├── Browse cars
 ├── Read articles
 ├── Create appointments
 └── Submit contacts

STAFF
 ├── View assigned contacts
 ├── Process contacts
 └── Update contact status

ADMIN
 ├── Manage users
 ├── Manage cars
 ├── Manage articles
 ├── Manage contacts
 ├── Assign staff
 └── Manage appointments
```

Authorization is handled on the backend rather than relying only on frontend route protection.

This prevents users from bypassing authorization simply by manually calling the API.

---

# 🔐 Authentication

Authentication is implemented using **JWT (JSON Web Token)**.

Authentication flow:

```text
Login
  ↓
Backend validates credentials
  ↓
Password verification with bcrypt
  ↓
JWT generated
  ↓
Token returned to client
  ↓
Token stored on client
  ↓
Axios interceptor attaches token
  ↓
Protected API
```

Example request:

```http
Authorization: Bearer <token>
```

The frontend Axios instance automatically attaches the authentication token to API requests.

If the API returns:

```text
401 Unauthorized
```

the client removes the invalid token and redirects the user to the login page.

---

# 🔒 Password Security

User passwords are never stored as plain text.

The backend uses:

```text
bcrypt
```

to hash passwords before storing them in MongoDB.

Authentication flow:

```text
Password
   ↓
bcrypt hash
   ↓
MongoDB
```

During login:

```text
Input password
      ↓
bcrypt.compare()
      ↓
Valid / Invalid
```

---

# 📰 Article Management

The application also provides an article/news system.

Features include:

* Article listing
* Search articles
* Filter articles
* Article details
* Article tags
* Social sharing
* Article registration/newsletter UI
* Article management

Article details can contain:

```text
Title
Thumbnail
Content
Author
Published date
Category
Tags
```

---

# 🖼️ Image Upload

Images are handled through **Cloudinary**.

Example workflow:

```text
Frontend
   ↓
Select image
   ↓
Multer
   ↓
Backend
   ↓
Cloudinary
   ↓
Image URL
   ↓
MongoDB
```

Instead of storing image files directly inside the backend server, the application stores the Cloudinary URL.

Benefits:

* Reduced server storage
* CDN delivery
* Easier deployment
* Better image management
* Suitable for cloud environments

---

# 🧪 Form Validation

The project uses **Zod** and **React Hook Form** for form validation.

Example validation requirements:

```text
Username
 └── Minimum length

Email
 └── Valid email format

Password
 ├── Minimum 8 characters
 └── Uppercase character required

Phone
 └── Numeric validation
```

This allows validation to happen before sending invalid data to the backend.

---

# 🔄 Server State Management

The frontend uses **TanStack React Query** to manage server-side state.

Responsibilities include:

* Fetching data
* Caching
* Loading states
* Error states
* Mutations
* Query invalidation
* Refetching

Example concept:

```text
Component
    ↓
Custom Hook
    ↓
React Query
    ↓
Service
    ↓
Axios
    ↓
REST API
```

This keeps API logic separate from presentation components.

---

# 🧩 Frontend Architecture

The frontend follows a component-based architecture.

Example:

```text
Page
 ↓
Feature Component
 ↓
Custom Hook
 ↓
Query / Mutation
 ↓
Service
 ↓
Axios
 ↓
Backend API
```

For example:

```text
ArticleDetails
      ↓
useArticleDetails()
      ↓
articleService
      ↓
Axios
      ↓
GET /articles/:id
```

This approach helps make the application:

* Easier to maintain
* Easier to test
* Easier to refactor
* More reusable
* Less coupled

---

# 🧠 Custom Hooks

Business and data-fetching logic is separated into custom hooks.

Examples:

```text
useArticles()
useCarDetail()
useCars()
useCurrentUser()
useContacts()
useMyContact()
useLoginMutation()
```

Instead of putting API logic directly inside JSX components, components focus mainly on rendering UI.

---

# 🌐 RESTful API

The backend exposes RESTful APIs for frontend communication.

Example endpoints:

```text
Authentication
POST   /auth/login
POST   /auth/register
GET    /auth/me

Cars
GET    /cars
GET    /cars/:id
POST   /cars
PUT    /cars/:id
DELETE /cars/:id

Articles
GET    /articles
GET    /articles/:id
POST   /articles
PUT    /articles/:id
DELETE /articles/:id

Contacts
GET    /contacts
POST   /contacts
PUT    /contacts/:id

Appointments
GET    /appointments
POST   /appointments
PUT    /appointments/:id
```

> Endpoint names may differ depending on the current backend implementation.

---

# 🗄️ Database

MongoDB is used as the main database.

The backend uses **Mongoose** for schema definition, validation, relationships, and database operations.

Main entities include:

```text
User
Car
CarDetail
Contact
Appointment
Article
Customer
```

Example relationship:

```text
User
 │
 ├── manages → Car
 │
 ├── assigned → Contact
 │
 └── handles → Appointment

Staff,Admin
 ├── creates → Contact
 │
 └── creates → Appointment

Car
 │
 ├── has → CarDetail
 │
 ├── receives → Contact
 │
 └── receives → Appointment
```

---

# 📊 Pagination & Filtering

Large datasets are handled using pagination rather than loading everything at once.

Example:

```http
GET /cars?page=1&limit=10
```

Filtering can be combined with pagination:

```http
GET /contacts?page=1&limit=10&status=pending
```

This approach is more suitable for production systems as the dataset grows.

---

# 🐳 Docker

The backend is containerized using Docker.

Basic workflow:

```text
Source Code
    ↓
Dockerfile
    ↓
Docker Image
    ↓
Docker Container
    ↓
Node.js + Express API
```

Example commands:

```bash
docker build -t autocar-backend .
```

Run:

```bash
docker run -p 5000:5000 autocar-backend
```

Docker helps create a consistent environment between development and deployment.

---

# ⚙️ Environment Variables

Sensitive configuration is stored using environment variables.

Example:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=http://localhost:5173
```

Frontend example:

```env
VITE_API_URL=http://localhost:5000/api
```

> Never commit `.env` files or secrets to GitHub.

---

# 🚀 Local Development

## 1. Clone repository

```bash
git clone https://github.com/ThinhSuycode/AutoCarWeb.git
```

```bash
cd AutoCarWeb
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
.env
```

Configure:

```env
VITE_API_URL=http://localhost:5000/api
```

Start development server:

```bash
npm run dev
```

Frontend will normally run on:

```text
http://localhost:5173
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create:

```text
.env
```

Configure required environment variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start backend:

```bash
npm run dev
```

API:

```text
http://localhost:5000
```

---

# 🐳 Run with Docker

Build the image:

```bash
docker build -t autocar-backend .
```

Run the container:

```bash
docker run -p 5000:5000 --env-file .env autocar-backend
```

---

# 🌍 Deployment Architecture

The project is prepared for cloud deployment.

Recommended architecture:

```text
                    GitHub
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
          Vercel              Render
        Frontend              Backend
        React/Vite        Node/Express
             │                   │
             │                   │
             └─────────┬─────────┘
                       │
                       ▼
                 MongoDB Atlas
                       │
                       │
                  Cloudinary
```

Deployment components:

```text
Frontend
→ Vercel

Backend
→ Render + Docker

Database
→ MongoDB Atlas

Images
→ Cloudinary

Source Code
→ GitHub

CI/CD
→ GitHub Actions
```

---

# 🔁 Git Workflow

The project uses Git for version control.

Typical workflow:

```bash
git status

git add .

git commit -m "feat: add car search"

git push origin main
```

For feature development:

```text
main
 │
 ├── feature/car-search
 ├── feature/article-management
 ├── feature/contact-manager
 └── feature/appointment
```

This allows features to be developed independently before merging into the main branch.

---

# 🔄 CI/CD

GitHub Actions can be used to automate:

```text
Push to GitHub
      ↓
GitHub Actions
      ↓
Install dependencies
      ↓
Run build / checks
      ↓
Deployment
```

This reduces manual deployment steps and helps detect build errors before deployment.

---

# 🎨 UI / UX

The frontend focuses on:

* Responsive design
* Reusable components
* Loading states
* Empty states
* Error handling
* Search experience
* Filter interactions
* Form feedback
* Toast notifications
* Mobile responsiveness

SCSS is organized into reusable modules to reduce style conflicts.

---

# 🧹 Code Quality

The project follows several development practices:

### TypeScript

TypeScript is used across the frontend and backend to improve type safety.

### Component Reusability

Common UI elements are extracted into reusable components.

### Custom Hooks

Business logic and data fetching are separated from presentation.

### Service Layer

API requests are separated into service modules.

### Schema Validation

Zod is used for frontend validation.

### Error Handling

API errors and loading states are handled explicitly.

### Environment Configuration

Sensitive information is managed through environment variables.

---

# 🧪 Example Data Flow

## Login

```text
User
 ↓
Login Form
 ↓
React Hook Form
 ↓
Zod Validation
 ↓
Auth Service
 ↓
Axios
 ↓
POST /auth/login
 ↓
Express Controller
 ↓
User Model
 ↓
bcrypt
 ↓
JWT
 ↓
Frontend
 ↓
Authenticated User
```

---

## Creating an Appointment

```text
Customer
 ↓
Appointment Form
 ↓
React Hook Form
 ↓
Zod
 ↓
Appointment Service
 ↓
POST /appointments
 ↓
Express Route
 ↓
Authentication Middleware
 ↓
Controller
 ↓
MongoDB
 ↓
Appointment Created
 ↓
React Query Invalidation
 ↓
UI Updated
```

---

# 🧑‍💻 My Responsibilities

As the developer of this project, I worked on the full development flow including:

### Frontend

* Designed and implemented React pages
* Built reusable components
* Developed responsive layouts
* Implemented React Router
* Integrated REST APIs
* Implemented React Query
* Implemented form handling
* Implemented Zod validation
* Managed loading/error/empty states
* Built search and filtering functionality

### Backend

* Designed RESTful APIs
* Implemented Express routes
* Developed controllers
* Designed MongoDB/Mongoose models
* Implemented JWT authentication
* Implemented role-based authorization
* Implemented password hashing
* Implemented pagination
* Implemented filtering/search
* Implemented file upload

### Infrastructure

* Configured Docker
* Configured environment variables
* Prepared MongoDB Atlas
* Integrated Cloudinary
* Managed Git/GitHub workflow
* Prepared Vercel/Render deployment
* Worked toward CI/CD automation

---

# 📚 What I Learned

Through this project, I gained practical experience with:

* Fullstack application architecture
* React + TypeScript development
* RESTful API design
* Node.js + Express
* MongoDB + Mongoose
* Authentication and authorization
* JWT
* Password security
* React Query
* Form validation
* Cloudinary
* Docker
* Environment variables
* Git/GitHub
* Deployment concepts
* Debugging frontend/backend integration
* Designing scalable project structures

More importantly, the project helped me understand how the different layers of a real-world application communicate with each other.

---

# 🚧 Future Improvements

Possible future improvements include:

* [ ] Add automated unit tests
* [ ] Add integration tests for APIs
* [ ] Improve API documentation with Swagger/OpenAPI
* [ ] Add advanced dashboard analytics
* [ ] Add real-time notifications
* [ ] Improve image optimization
* [ ] Add Redis caching
* [ ] Add rate limiting
* [ ] Improve logging and monitoring
* [ ] Implement more advanced CI/CD pipelines
* [ ] Improve automated deployment
* [ ] Add more comprehensive role permissions

---

# 📸 Screenshots

> Add screenshots here to help recruiters quickly understand the application.

### Home Page

```text
TODO: Add screenshot
```

### Car Listing

```text
TODO: Add screenshot
```

### Car Details

```text
TODO: Add screenshot
```

### Admin Dashboard

```text
TODO: Add screenshot
```

### Contact Management

```text
TODO: Add screenshot
```

### Article Management

```text
TODO: Add screenshot
```

---

# 🔗 Project Links

### GitHub

https://github.com/ThinhSuycode/AutoCarWeb

### Live Demo

```text
TODO: Add deployed frontend URL
```

### API

```text
TODO: Add deployed backend URL
```

---

# 👨‍💻 Developer

**Trần Quý Thịnh**

Final-year Information Technology Student
University of Economics Ho Chi Minh City (UEH)

### Technical Focus

```text
Frontend
React
TypeScript
React Query
SCSS

Backend
Node.js
Express.js
TypeScript

Database
MongoDB
Mongoose

Tools
Git
GitHub
Docker
Cloudinary

Deployment
Vercel
Render
MongoDB Atlas
GitHub Actions
```

---

# ⭐ Why This Project?

AutoCarWeb was built as a practical fullstack project to demonstrate the ability to develop and maintain a complete web application.

Instead of focusing only on UI implementation, the project covers the entire development lifecycle:

```text
Requirement
    ↓
UI Design
    ↓
React Frontend
    ↓
REST API
    ↓
Business Logic
    ↓
MongoDB
    ↓
Authentication
    ↓
Cloud Storage
    ↓
Docker
    ↓
GitHub
    ↓
CI/CD
    ↓
Cloud Deployment
```

The project demonstrates my ability to work across both **frontend and backend development**, understand system architecture, and gradually move a project toward a production-ready environment.
