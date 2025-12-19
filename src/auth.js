// ============================================
// FIXED auth.js with proper error handling
// ============================================
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

// Your backend API URL - CHECK THIS IS CORRECT!
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          console.error("Missing credentials");
          return null;
        }

        try {
          console.log("Attempting login to:", `${API_URL}/api/auth/login`);

          // FIXED: Proper fetch syntax
          const response = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
            // Add timeout and better error handling
            signal: AbortSignal.timeout(10000), // 10 second timeout
          });

          console.log("Response status:", response.status);

          // Check if response is ok
          if (!response.ok) {
            console.error("Login failed with status:", response.status);
            const errorData = await response.json().catch(() => ({}));
            console.error("Error data:", errorData);
            return null;
          }

          const data = await response.json();
          console.log("Login response:", data);

          // Check if login was successful
          if (data.status === "error") {
            console.error("Login error:", data.message);
            return null;
          }

          // Return user object with all fields from your backend
          if (data.status === "success" && data.user) {
            return {
              id: data.user.id,
              username: data.user.username,
              email: data.user.email,
              role: data.user.role,
              fullName: data.user.fullName,
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              profilePicture: data.user.profilePicture,
              phoneNumber: data.user.phoneNumber,
              backendToken: data.token,
            };
          }

          console.error("Invalid response format:", data);
          return null;
        } catch (error) {
          console.error("Authorization error:", error);

          // More specific error messages
          if (error.name === "AbortError") {
            console.error("Request timeout - backend might be slow or down");
          } else if (error.code === "ECONNREFUSED") {
            console.error("Backend server is not running!");
          } else if (error.code === "ECONNRESET") {
            console.error("Connection reset - check backend CORS settings");
          }

          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development", // Enable debug logs
});

// ============================================
// .env.local - VERIFY THESE SETTINGS
// ============================================
/*
AUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000

# Make sure your backend is running on port 5000!
# Check your backend .env file too
*/

// ============================================
// TROUBLESHOOTING GUIDE
// ============================================
/*

ERROR: "ECONNRESET" or "fetch failed"
SOLUTION:
1. Make sure backend is running:
   cd backend
   npm start (or npm run dev)

2. Check backend URL is correct in .env.local:
   NEXT_PUBLIC_API_URL=http://localhost:5000

3. Verify backend endpoint exists:
   POST http://localhost:5000/api/auth/login

4. Check CORS settings in backend:
   // backend/server.js or app.js
   app.use(cors({
     origin: 'http://localhost:3000',
     credentials: true
   }));

5. Test backend directly with curl:
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"admin123"}'


ERROR: "CredentialsSignin"
SOLUTION:
1. Check console logs for specific error
2. Verify backend is returning correct format:
   {
     status: "success",
     token: "...",
     user: { id, username, email, role, ... }
   }


BACKEND NOT RUNNING:
1. Check if backend process is running:
   Windows: tasklist | findstr node
   Mac/Linux: ps aux | grep node

2. Check backend port:
   netstat -ano | findstr :5000

3. Start backend:
   cd backend
   npm install
   npm start


CORS ERRORS:
Add this to your backend (Express.js):

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

*/

// ============================================
// backend/controllers/authController.js
// VERIFY YOUR BACKEND RETURNS THIS FORMAT:
// ============================================
/*
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: "error",
        message: "Please provide username and password",
      });
    }

    const user = await User.findOne({
      username,
      isActive: true,
    }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = user.getSignedJwtToken();

    // IMPORTANT: Return this exact format
    res.status(200).json({
      status: "success",
      token: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
*/

// ============================================
// QUICK TEST - Test backend directly
// ============================================
/*
Create a test file: test-backend.js

const fetch = require('node-fetch');

async function testLogin() {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123'
      })
    });
    
    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testLogin();

Run: node test-backend.js
*/

// ============================================
// CHECKLIST BEFORE RUNNING
// ============================================
/*
□ Backend server is running (check terminal)
□ Backend is on correct port (5000)
□ CORS is configured in backend
□ .env.local has correct NEXT_PUBLIC_API_URL
□ AUTH_SECRET is set in .env.local
□ Backend endpoint is /api/auth/login (not /api/v1/auth/login)
□ Backend returns { status: "success", token, user }
*/
