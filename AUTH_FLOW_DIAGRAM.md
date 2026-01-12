# Authentication Flow Diagram

## Complete Authentication Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React + Vite)                          │
│                      http://localhost:5173                               │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTP Requests
                                    │ (Bearer Token)
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       BACKEND (Node.js + Express)                        │
│                      http://localhost:3000/api/v1                        │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ SQL Queries
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         DATABASE (PostgreSQL)                            │
│                      Tables: users, refresh_tokens                       │
└─────────────────────────────────────────────────────────────────────────┘
```

## Registration Flow

```
┌──────────┐           ┌──────────────┐           ┌────────────┐
│  User    │           │   Frontend   │           │  Backend   │
└────┬─────┘           └──────┬───────┘           └─────┬──────┘
     │                        │                         │
     │  Fill Registration Form│                         │
     ├───────────────────────►│                         │
     │                        │                         │
     │                        │ POST /auth/register     │
     │                        ├────────────────────────►│
     │                        │ {username, email,       │
     │                        │  password, avatar}      │
     │                        │                         │
     │                        │                         │ Validate Input
     │                        │                         ├──────────┐
     │                        │                         │          │
     │                        │                         │◄─────────┘
     │                        │                         │
     │                        │                         │ Hash Password
     │                        │                         ├──────────┐
     │                        │                         │          │
     │                        │                         │◄─────────┘
     │                        │                         │
     │                        │                         │ Insert User
     │                        │                         ├──────────┐
     │                        │                         │          │
     │                        │                         │◄─────────┘
     │                        │                         │
     │                        │                         │ Generate Tokens
     │                        │                         ├──────────┐
     │                        │                         │          │
     │                        │                         │◄─────────┘
     │                        │                         │
     │                        │ Response: tokens + user │
     │                        │◄────────────────────────┤
     │                        │                         │
     │                        │ Store Tokens            │
     │                        ├──────────┐              │
     │                        │          │              │
     │                        │◄─────────┘              │
     │                        │                         │
     │  Redirect to Dashboard │                         │
     │◄───────────────────────┤                         │
     │                        │                         │
```

## Login Flow

```
┌──────────┐           ┌──────────────┐           ┌────────────┐
│  User    │           │   Frontend   │           │  Backend   │
└────┬─────┘           └──────┬───────┘           └─────┬──────┘
     │                        │                         │
     │  Enter Credentials     │                         │
     ├───────────────────────►│                         │
     │                        │                         │
     │                        │ POST /auth/login        │
     │                        ├────────────────────────►│
     │                        │ {email, password}       │
     │                        │                         │
     │                        │                         │ Find User
     │                        │                         ├──────────┐
     │                        │                         │          │
     │                        │                         │◄─────────┘
     │                        │                         │
     │                        │                         │ Verify Password
     │                        │                         ├──────────┐
     │                        │                         │          │
     │                        │                         │◄─────────┘
     │                        │                         │
     │                        │                         │ Update Streak
     │                        │                         ├──────────┐
     │                        │                         │          │
     │                        │                         │◄─────────┘
     │                        │                         │
     │                        │                         │ Generate Tokens
     │                        │                         ├──────────┐
     │                        │                         │          │
     │                        │                         │◄─────────┘
     │                        │                         │
     │                        │ Response: tokens + user │
     │                        │◄────────────────────────┤
     │                        │                         │
     │                        │ Store Tokens            │
     │                        ├──────────┐              │
     │                        │          │              │
     │                        │◄─────────┘              │
     │                        │                         │
     │  Redirect to Dashboard │                         │
     │◄───────────────────────┤                         │
     │                        │                         │
```

## Token Refresh Flow

```
┌──────────┐           ┌──────────────┐           ┌────────────┐
│  User    │           │   Frontend   │           │  Backend   │
└────┬─────┘           └──────┬───────┘           └─────┬──────┘
     │                        │                         │
     │  Click Protected Action│                         │
     ├───────────────────────►│                         │
     │                        │                         │
     │                        │ GET /users/profile      │
     │                        ├────────────────────────►│
     │                        │ Authorization: Bearer   │
     │                        │    (expired token)      │
     │                        │                         │
     │                        │ 401 Unauthorized        │
     │                        │◄────────────────────────┤
     │                        │                         │
     │                        │ POST /auth/refresh      │
     │                        ├────────────────────────►│
     │                        │ {refreshToken}          │
     │                        │                         │
     │                        │                         │ Verify Refresh Token
     │                        │                         ├──────────┐
     │                        │                         │          │
     │                        │                         │◄─────────┘
     │                        │                         │
     │                        │                         │ Generate New Access Token
     │                        │                         ├──────────┐
     │                        │                         │          │
     │                        │                         │◄─────────┘
     │                        │                         │
     │                        │ Response: new token     │
     │                        │◄────────────────────────┤
     │                        │                         │
     │                        │ Update Stored Token     │
     │                        ├──────────┐              │
     │                        │          │              │
     │                        │◄─────────┘              │
     │                        │                         │
     │                        │ RETRY GET /users/profile│
     │                        ├────────────────────────►│
     │                        │ Authorization: Bearer   │
     │                        │    (new token)          │
     │                        │                         │
     │                        │ 200 OK + profile data   │
     │                        │◄────────────────────────┤
     │                        │                         │
     │  Show Profile Data     │                         │
     │◄───────────────────────┤                         │
     │                        │                         │
```

## Logout Flow

```
┌──────────┐           ┌──────────────┐           ┌────────────┐
│  User    │           │   Frontend   │           │  Backend   │
└────┬─────┘           └──────┬───────┘           └─────┬──────┘
     │                        │                         │
     │  Click Logout          │                         │
     ├───────────────────────►│                         │
     │                        │                         │
     │                        │ POST /auth/logout       │
     │                        ├────────────────────────►│
     │                        │ {refreshToken}          │
     │                        │ Authorization: Bearer   │
     │                        │                         │
     │                        │                         │ Delete Refresh Token
     │                        │                         ├──────────┐
     │                        │                         │          │
     │                        │                         │◄─────────┘
     │                        │                         │
     │                        │ 200 OK                  │
     │                        │◄────────────────────────┤
     │                        │                         │
     │                        │ Clear LocalStorage      │
     │                        ├──────────┐              │
     │                        │          │              │
     │                        │◄─────────┘              │
     │                        │                         │
     │  Redirect to Landing   │                         │
     │◄───────────────────────┤                         │
     │                        │                         │
```

## Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                           App                                │
│                    (AuthProvider)                            │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
     ┌──────────▼──────────┐    ┌──────────▼──────────┐
     │  Not Authenticated  │    │    Authenticated     │
     └──────────┬──────────┘    └──────────┬──────────┘
                │                           │
      ┌─────────┴─────────┐       ┌────────┴────────┐
      │                   │       │                 │
┌─────▼──────┐  ┌────────▼─────┐ │   ┌─────────────▼─────────────┐
│ LandingPage│  │    Login     │ │   │      GameProvider         │
└────────────┘  │   Register   │ │   └─────────────┬─────────────┘
                └──────────────┘ │                 │
                                 │   ┌─────────────▼─────────────┐
                                 │   │  NotificationProvider     │
                                 │   └─────────────┬─────────────┘
                                 │                 │
                                 │   ┌─────────────┴─────────────┐
                                 │   │                           │
                          ┌──────▼───▼──┐                ┌──────▼──────┐
                          │  Dashboard  │                │ ProfilePage │
                          └─────────────┘                └─────────────┘
                          ┌─────────────┐                ┌─────────────┐
                          │ CoursePage  │                │  QuizPage   │
                          └─────────────┘                └─────────────┘
                          ┌─────────────┐                ┌─────────────┐
                          │ExercisePage │                │ Leaderboard │
                          └─────────────┘                └─────────────┘
```

## State Management

```
┌─────────────────────────────────────────────────────────────┐
│                      AuthContext                             │
│                                                              │
│  State:                                                      │
│  ├─ user: User | null                                        │
│  ├─ loading: boolean                                         │
│  ├─ error: string | null                                     │
│  └─ isAuthenticated: boolean                                 │
│                                                              │
│  Methods:                                                    │
│  ├─ login(credentials)                                       │
│  ├─ register(userData)                                       │
│  ├─ logout()                                                 │
│  ├─ updateUser(data)                                         │
│  ├─ changePassword(passwordData)                             │
│  └─ checkAuth()                                              │
└─────────────────────────────────────────────────────────────┘
```

## Token Storage

```
┌─────────────────────────────────────────────────────────────┐
│                      localStorage                            │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ token: "eyJhbGciOiJIUzI1NiIsInR5..."                   │ │
│  │ (Access Token - 15min expiry)                          │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ refreshToken: "eyJhbGciOiJIUzI1NiIsInR5..."           │ │
│  │ (Refresh Token - 7 days expiry)                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ user: {                                                │ │
│  │   "id": 123,                                           │ │
│  │   "username": "john_doe",                              │ │
│  │   "email": "john@example.com",                         │ │
│  │   "avatar": "👨",                                      │ │
│  │   "xp": 450,                                           │ │
│  │   "level": 5,                                          │ │
│  │   "streak": 7                                          │ │
│  │ }                                                      │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## API Request Flow with Auth

```
Frontend Component
      │
      │ Needs Data
      ▼
  api.users.getProfile()
      │
      │ request('/users/profile', { auth: true })
      ▼
  Add Authorization Header
  "Bearer eyJhbGciOiJIUzI1..."
      │
      │ HTTP Request
      ▼
Backend Middleware
      │
      ├─ verifyToken(req, res, next)
      │     │
      │     ├─ Extract token from header
      │     ├─ Verify JWT signature
      │     ├─ Check expiration
      │     └─ Attach user to req.user
      │
      ▼
  Controller Handler
      │
      ├─ Access req.user.id
      ├─ Query database
      └─ Return response
      │
      ▼
  Frontend Receives Data
      │
      └─ Update UI
```

## Error Handling Flow

```
API Request
      │
      ▼
  ┌───────────────┐
  │ Success (200) │──► Continue normal flow
  └───────────────┘
      │
  ┌───────────────┐
  │ Auth (401)    │──► Try refresh token
  └───────────────┘     │
                        ├─ Success ──► Retry original request
                        └─ Failure ──► Redirect to login
      │
  ┌───────────────┐
  │ Error (4xx)   │──► Show error message to user
  └───────────────┘
      │
  ┌───────────────┐
  │ Server (5xx)  │──► Show "Server error" message
  └───────────────┘
```
