// ============================================
// 2. auth.config.js - Auth configuration
// ============================================
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtectedRoute =
        nextUrl.pathname.startsWith("/") ||
        nextUrl.pathname === "/" ||
        nextUrl.pathname.startsWith("/admin") ||
        nextUrl.pathname.startsWith("/calendar");

      // Allow public routes
      if (
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register") ||
        nextUrl.pathname.startsWith("/reset-password")
      ) {
        // If logged in, redirect away from auth pages
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      }

      // Protect all other routes
      if (isOnProtectedRoute && !isLoggedIn) {
        return false; // Redirect to login
      }

      return true;
    },
    jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
        token.fullName = user.fullName;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.profilePicture = user.profilePicture;
        token.phoneNumber = user.phoneNumber;
      }
      return token;
    },
    session({ session, token }) {
      // Send properties to client
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.fullName = token.fullName;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.profilePicture = token.profilePicture;
        session.user.phoneNumber = token.phoneNumber;
      }
      return session;
    },
  },
  providers: [],
};

// ============================================
// 9. .env.local - Environment variables
// ============================================
/*
AUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
*/

// ============================================
// 10. Installation & Setup
// ============================================
/*
1. Install dependencies:
npm install next-auth@beta

2. Generate AUTH_SECRET:
openssl rand -base64 32

3. Add to .env.local:
AUTH_SECRET=your-generated-secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000

4. File structure:
project/
├── auth.js
├── auth.config.js
├── middleware.js
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.js
│   ├── login/
│   │   └── page.js
│   └── dashboard/
│       └── page.js
├── components/
│   ├── DashboardContent.jsx
│   └── dashboard/
│       ├── AdminDashboard.jsx
│       ├── TeacherDashboard.jsx
│       └── ... (all your role dashboards)
└── lib/
    └── api.js

5. Remove Zustand auth store - no longer needed!

6. Your backend stays exactly the same - no changes needed!
*/
