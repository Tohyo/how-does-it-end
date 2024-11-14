# Blog Project Specification

## Overview
A blog platform with JWT authentication where users can create and read articles.

## Technology Stack
- Backend: Symfony 6.4
- Frontend: Next.js 14
- Database: MySQL
- Authentication: JWT
- Testing: PHPUnit, Jest

## Backend (Symfony)

### Entities

#### User Entity
- Properties:
  - id (int, auto-increment)
  - email (string, unique)
  - password (string, hashed)
  - name (string)
  - roles (array)
- Validation:
  - Email: required, valid email format
  - Password: min 8 chars, 1 number, 1 special char
  - Name: required, 2-50 chars
- Implements: UserInterface, PasswordAuthenticatedUserInterface, JsonSerializable

#### Article Entity
- Properties:
  - id (int, auto-increment)
  - title (string)
  - content (text)
  - category (string)
  - createdAt (DateTimeImmutable)
- Validation:
  - Title: required, 3-255 chars
  - Content: required, min 10 chars
  - Category: required, max 100 chars
- Implements: JsonSerializable

### Authentication
- JWT based authentication
- Token payload includes: id, email, name
- Stateless API
- Routes:
  - POST /api/login (public)
  - POST /api/register (public)
  - GET /api/me (protected)

### API Endpoints
- Articles:
  - GET /api/articles
  - GET /api/articles/{id}
  - POST /api/articles
  - PUT /api/articles/{id}
  - DELETE /api/articles/{id}

### Testing
- Unit tests for entities
- Functional tests for authentication
- Functional tests for article CRUD
- Use Foundry for fixtures

## Frontend (Next.js)

### Components

#### Authentication
- LoginForm
  - Email/password inputs
  - Error handling
  - JWT storage in HTTP-only cookies
  - Redirect on success

- RegisterForm
  - Name/email/password inputs
  - Validation matching backend
  - Error handling
  - Redirect to login

- Navigation
  - Conditional rendering based on auth state
  - User info display
  - Logout functionality

#### Articles
- ArticleList
  - Grid layout
  - Article preview cards
  - Category badges
  - Date formatting

- ArticleDetail
  - Full article display
  - Author info
  - Category display
  - Created date

- ArticleForm
  - Title/content/category inputs
  - Validation
  - Error handling
  - Success redirect

### Pages
- Home (/)
  - Article list
  - Hero section
  - Features section

- Login (/login)
  - LoginForm
  - Link to register

- Register (/register)
  - RegisterForm
  - Link to login

- Article Detail (/articles/[id])
  - Full article display
  - Protected route

### State Management
- AuthContext for user state
- JWT handling through cookies
- Protected route wrapper

### Testing
- Component tests
- Page tests
- API route tests
- Authentication flow tests

## Styling
- TailwindCSS
- Responsive design
- Dark mode support

## Security Requirements
- HTTP-only cookies for JWT
- Input sanitization
- CSRF protection
- Password hashing
- Protected routes
- Token expiration

## Error Handling
- Form validation errors
- API error responses
- Authentication errors
- Loading states
- Not found states

## Development Setup
- Environment variables
- CORS configuration
- Database migrations
- Test database
- Development servers 