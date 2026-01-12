# Quick Start Guide - Authentication System

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js installed
- PostgreSQL database running
- Backend database seeded

### Step 1: Configure Environment

#### Backend (.env)
```bash
cd Educonnect-backendV2
```

Create/verify `.env` file:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=educonnect
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your-super-secret-key-change-in-production
JWT_REFRESH_SECRET=your-refresh-secret-key-change-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

NODE_ENV=development
```

#### Frontend (.env)
```bash
cd Educonnect-frontendV2
```

Create `.env` file:
```env
VITE_API_BASE=http://localhost:3000/api/v1
VITE_ENV=development
```

### Step 2: Install Dependencies

#### Backend
```bash
cd Educonnect-backendV2
npm install
```

#### Frontend
```bash
cd Educonnect-frontendV2
npm install
```

### Step 3: Setup Database (if not done)

```bash
cd Educonnect-backendV2

# Run migrations
node scripts/migrate.js

# Seed data
node scripts/seed.js
```

### Step 4: Start Services

#### Terminal 1 - Backend
```bash
cd Educonnect-backendV2
npm start
```

You should see:
```
╔═══════════════════════════════════════╗
║                                       ║
║     🎓 EduConnect API Server 🎓      ║
║                                       ║
║  Status: ✓ Running                    ║
║  Port: 3000                           ║
║  Environment: development             ║
║                                       ║
╚═══════════════════════════════════════╝
```

#### Terminal 2 - Frontend
```bash
cd Educonnect-frontendV2
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 5: Test the Application

1. **Open Browser**: Navigate to `http://localhost:5173`

2. **Test Registration**:
   - Click "S'inscrire" or "Commencer"
   - Fill in the form:
     - Username: `test_user`
     - Email: `test@example.com`
     - Password: `password123`
     - Avatar: Choose any emoji
   - Click "S'inscrire"
   - ✅ Should redirect to Dashboard

3. **Test Logout**:
   - Click your avatar in top right
   - Click "Se déconnecter"
   - ✅ Should redirect to Landing Page

4. **Test Login**:
   - Click "Connexion"
   - Enter:
     - Email: `test@example.com`
     - Password: `password123`
   - Click "Se connecter"
   - ✅ Should redirect to Dashboard

5. **Test Protected Routes**:
   - Navigate to different pages (Cours, Exercices, Quiz)
   - ✅ All should work with authenticated session

6. **Test Auto-Login**:
   - Refresh the page (F5)
   - ✅ Should remain logged in

7. **Test Token Refresh** (Advanced):
   - Open DevTools (F12)
   - Go to Application → Local Storage
   - Delete the `token` key (keep `refreshToken`)
   - Try to access Profile page
   - ✅ Token should auto-refresh and page should load

## 📝 Common Test Scenarios

### Scenario 1: New User Registration
```
1. Navigate to http://localhost:5173
2. Click "Commencer" or "S'inscrire"
3. Fill registration form
4. Submit
5. Verify:
   ✅ Tokens stored in localStorage
   ✅ User redirected to dashboard
   ✅ User data visible in profile
```

### Scenario 2: Existing User Login
```
1. Navigate to http://localhost:5173
2. Click "Connexion"
3. Enter credentials
4. Submit
5. Verify:
   ✅ Tokens stored in localStorage
   ✅ User redirected to dashboard
   ✅ Correct user data displayed
```

### Scenario 3: Invalid Login
```
1. Navigate to login page
2. Enter wrong password
3. Submit
4. Verify:
   ✅ Error message displayed
   ✅ User stays on login page
   ✅ No tokens stored
```

### Scenario 4: Session Persistence
```
1. Login successfully
2. Refresh page (F5)
3. Verify:
   ✅ User remains logged in
   ✅ Dashboard still accessible
   ✅ User data still available
```

### Scenario 5: Logout
```
1. While logged in, click logout
2. Verify:
   ✅ Redirected to landing page
   ✅ Tokens cleared from localStorage
   ✅ Cannot access protected routes
```

## 🔍 Debugging Tips

### Check Backend is Running
```bash
curl http://localhost:3000/api/v1/health
```
Expected response:
```json
{
  "success": true,
  "message": "EduConnect API is running",
  "timestamp": "2026-01-12T..."
}
```

### Check Frontend Environment
Open browser console and type:
```javascript
console.log(import.meta.env.VITE_API_BASE)
```
Should output: `http://localhost:3000/api/v1`

### Check Tokens
Open DevTools → Application → Local Storage → `http://localhost:5173`
Should see:
- `token`
- `refreshToken`
- `user`

### Check API Logs
Backend terminal shows all requests:
```
📥 [POST] /api/v1/auth/login - Anonymous
✅ User logged in successfully: test@example.com (ID: 1)
📤 [POST] /api/v1/auth/login - Status: 200 OK - Duration: 145ms
```

### Check Network Tab
DevTools → Network → Filter by "XHR"
- Should see API calls to `localhost:3000`
- Check request headers for Authorization
- Check response status codes

## 🐛 Troubleshooting

### Problem: "Cannot connect to API"
**Solution**:
1. Check backend is running: `curl http://localhost:3000/api/v1/health`
2. Verify `.env` file has correct `VITE_API_BASE`
3. Restart frontend: `npm run dev`

### Problem: CORS errors
**Solution**:
1. Backend allows `localhost:5173` by default
2. Check backend `.env` for `CORS_ORIGIN`
3. Restart backend after changes

### Problem: "Invalid token" errors
**Solution**:
1. Clear localStorage: DevTools → Application → Clear Storage
2. Logout and login again
3. Check JWT secrets match in backend `.env`

### Problem: Page refresh logs out user
**Solution**:
1. Check tokens exist in localStorage
2. Verify AuthContext is properly wrapped in App.jsx
3. Check browser console for errors

### Problem: Registration fails
**Solution**:
1. Check backend logs for validation errors
2. Verify all required fields are filled
3. Ensure username/email are unique
4. Check password meets minimum length (6 chars)

## 📊 Success Indicators

### Backend Logs
You should see logs like:
```
📝 User registration attempt: test@example.com
✅ User registered successfully: test@example.com (ID: 1)
🔐 Login attempt: test@example.com
✅ User logged in successfully: test@example.com (ID: 1)
📄 Fetching user profile for ID 1
✅ User profile retrieved: test_user
```

### Frontend Console
You should see:
```
[api] fetch /auth/login status= 200 content-type= application/json
[api] response preview: {"success":true,"data":{"user":{...}}}
```

### Browser Storage
localStorage should contain:
```
token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
user: "{\"id\":1,\"username\":\"test_user\",...}"
```

## 🎯 Key Features to Test

- ✅ User registration with validation
- ✅ User login with credentials
- ✅ Automatic token refresh
- ✅ Protected route access
- ✅ Logout functionality
- ✅ Session persistence across refresh
- ✅ Error handling and messages
- ✅ Loading states
- ✅ User profile display
- ✅ Navigation between pages

## 📚 Documentation References

- **Full Guide**: `AUTH_INTEGRATION.md`
- **Implementation Summary**: `AUTH_IMPLEMENTATION_SUMMARY.md`
- **Flow Diagrams**: `AUTH_FLOW_DIAGRAM.md`
- **Backend API**: `../Educonnect-backendV2/API_DOCS.md`
- **Backend Logging**: `../Educonnect-backendV2/LOGGING.md`

## 🎉 You're Ready!

If all steps completed successfully, you now have:
- ✅ Working authentication system
- ✅ Frontend connected to backend
- ✅ Automatic token management
- ✅ Protected routes
- ✅ User registration and login
- ✅ Session persistence

Start building your features! 🚀
