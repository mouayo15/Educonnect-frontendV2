# Authentication Integration Guide

## Overview
The frontend is now fully integrated with the backend authentication system. All auth operations are connected to the EduConnect API with proper token management and automatic refresh.

## Features Implemented

### 1. **AuthContext** (`src/contexts/AuthContext.jsx`)
Centralized authentication state management with:
- User authentication state
- Login/Register functions
- Logout with token cleanup
- Automatic token refresh
- Password change functionality
- Auth checking on app load

### 2. **Updated Components**

#### Login Component (`src/components/Login.jsx`)
- ✅ Connected to backend `/api/v1/auth/login`
- ✅ Stores `accessToken` and `refreshToken`
- ✅ Handles login errors from backend
- ✅ Form validation
- ✅ Loading states

#### Register Component (`src/components/Register.jsx`)
- ✅ Connected to backend `/api/v1/auth/register`
- ✅ Updated fields to match backend schema:
  - `username` (required, min 3 chars)
  - `email` (required, valid email)
  - `password` (required, min 6 chars)
  - `avatar` (optional, emoji selector)
- ✅ Stores tokens on successful registration
- ✅ Form validation with error messages

#### App Component (`src/App.jsx`)
- ✅ Wrapped with `AuthProvider`
- ✅ Automatic authentication check on load
- ✅ Protected routes (redirects to login if not authenticated)
- ✅ Loading screen during auth check
- ✅ Proper navigation flow

### 3. **API Configuration** (`src/lib/api.js`)
Enhanced with:
- ✅ Automatic token refresh on 401 errors
- ✅ Bearer token authentication
- ✅ Error handling with backend error messages
- ✅ Proper request/response unwrapping
- ✅ Logout endpoint support

### 4. **Environment Configuration** (`.env`)
```env
VITE_API_BASE=http://localhost:3000/api/v1
VITE_ENV=development
```

## Authentication Flow

### Registration Flow
```
1. User fills registration form
2. Frontend validates input (username, email, password)
3. POST /api/v1/auth/register
4. Backend creates user and returns tokens
5. Frontend stores:
   - accessToken (15min expiry)
   - refreshToken (7 days expiry)
   - user data
6. User redirected to Dashboard
```

### Login Flow
```
1. User enters email and password
2. POST /api/v1/auth/login
3. Backend validates credentials
4. On success: Returns tokens + user data
5. Frontend stores tokens
6. User redirected to Dashboard
```

### Token Refresh Flow
```
1. API request returns 401 (Unauthorized)
2. api.js automatically tries to refresh token
3. POST /api/v1/auth/refresh with refreshToken
4. On success: Updates accessToken, retries original request
5. On failure: Redirects to login page
```

### Logout Flow
```
1. User clicks logout
2. POST /api/v1/auth/logout with refreshToken
3. Backend invalidates refresh token
4. Frontend clears all tokens from localStorage
5. User redirected to landing page
```

## Token Storage

Tokens are stored in localStorage:
- `token` - JWT access token (short-lived)
- `refreshToken` - JWT refresh token (long-lived)
- `user` - User data object

## Protected Routes

All authenticated API calls use `{ auth: true }` flag:
```javascript
// Example protected API call
api.users.getProfile() // Automatically includes Bearer token
api.quizzes.submitAttempt(quizId, answers) // Authenticated
```

## Backend Endpoints Used

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/logout` - Logout user
- `POST /api/v1/auth/change-password` - Change password

### User Management
- `GET /api/v1/users/profile` - Get user profile
- `PATCH /api/v1/users/profile` - Update profile
- `GET /api/v1/users/stats` - Get user stats
- `GET /api/v1/users/achievements` - Get achievements
- `GET /api/v1/users/activity` - Get activity history

## Usage in Components

### Using AuthContext
```jsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please login</div>;
  }
  
  return <div>Welcome {user.username}!</div>;
}
```

### Making Authenticated API Calls
```jsx
import api from '../lib/api';

// Will automatically include auth token
const userProfile = await api.users.getProfile();
const achievements = await api.users.getAchievements();
```

## Error Handling

### Login/Register Errors
- Invalid credentials: "Invalid email or password"
- User exists: "User already exists with this email or username"
- Validation errors: Specific field errors from backend
- Network errors: "Une erreur est survenue. Veuillez réessayer."

### Token Errors
- Expired token: Automatically refreshed
- Invalid refresh token: Redirected to login
- No token: Redirected to login

## Security Features

✅ **JWT Tokens**: Secure authentication with expiry
✅ **Refresh Token**: Long-lived token for seamless UX
✅ **Automatic Refresh**: No interruption when access token expires
✅ **Secure Storage**: Tokens in localStorage (client-side only)
✅ **Bearer Authentication**: Standard HTTP Authorization header
✅ **Error Recovery**: Graceful handling of auth failures

## Testing the Integration

### 1. Start Backend
```bash
cd Educonnect-backendV2
npm start
```

Backend should be running on `http://localhost:3000`

### 2. Start Frontend
```bash
cd Educonnect-frontendV2
npm run dev
```

Frontend should be running on `http://localhost:5173`

### 3. Test Registration
1. Navigate to landing page
2. Click "S'inscrire" or "Commencer"
3. Fill form:
   - Username: test_user
   - Email: test@example.com
   - Password: password123
   - Avatar: Choose emoji
4. Submit form
5. Should redirect to Dashboard with user data

### 4. Test Login
1. Logout from Dashboard
2. Click "Connexion"
3. Enter credentials
4. Should redirect to Dashboard

### 5. Test Auto-Refresh
1. Open DevTools → Application → Local Storage
2. Delete `token` (keep `refreshToken`)
3. Try any authenticated action
4. Token should auto-refresh

### 6. Test Logout
1. Click user menu → Logout
2. Tokens should be cleared
3. Should redirect to landing page

## Common Issues

### CORS Errors
**Problem**: Browser blocks requests to backend
**Solution**: Backend already configured for localhost:5173

### 404 Errors
**Problem**: Wrong API endpoint
**Solution**: Check `.env` file has correct `VITE_API_BASE`

### Token Not Sent
**Problem**: Auth header missing
**Solution**: Ensure API calls use `{ auth: true }`

### Redirect Loop
**Problem**: Constant redirect between login and dashboard
**Solution**: Clear localStorage and refresh browser

## Next Steps

- [ ] Implement "Remember Me" functionality
- [ ] Add email verification
- [ ] Implement password reset
- [ ] Add OAuth providers (Google, Facebook)
- [ ] Implement 2FA
- [ ] Add session timeout warnings

## API Documentation

For complete backend API documentation, see:
- `Educonnect-backendV2/API_DOCS.md`
- `Educonnect-backendV2/LOGGING.md`
