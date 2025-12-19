// ============================================
// 1. app/dashboard/page.js - Server Component
// ============================================
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SchoolDashboard from "@/components/dashboard/SchoolDashboard";

export default async function DashboardPage() {
  // Get session on server side
  const session = await auth();

  // Redirect if not authenticated
  if (!session?.user) {
    redirect("/login");
  }

  // Pass session to client component
  return <SchoolDashboard session={session} />;
}

// ============================================
// 3. USAGE IN CHILD DASHBOARD COMPONENTS
// ============================================

// Example: components/dashboard/AdminDashboard.jsx
/*
"use client";

export default function AdminDashboard({ user }) {
  return (
    <div>
      <h2>Welcome, {user?.fullName || user?.username}!</h2>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <p>Phone: {user?.phoneNumber}</p>
      
      {user?.profilePicture && (
        <img 
          src={user.profilePicture} 
          alt="Profile" 
          className="w-20 h-20 rounded-full"
        />
      )}
      
      // Your admin dashboard content here...
    </div>
  );
}
*/

// Example: components/dashboard/TeacherDashboard.jsx
/*
"use client";

export default function TeacherDashboard({ user }) {
  return (
    <div>
      <h2>Teacher Portal - {user?.fullName}</h2>
      <p>Your ID: {user?.id}</p>
      
      // Your teacher dashboard content here...
    </div>
  );
}
*/

// ============================================
// 4. ACCESSING SESSION DATA IN OTHER COMPONENTS
// ============================================

// Option A: Using useSession hook (client components)
/*
"use client";

import { useSession } from "next-auth/react";

export default function SomeClientComponent() {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  
  if (status === "unauthenticated") {
    return <div>Not logged in</div>;
  }
  
  return (
    <div>
      <p>Username: {session?.user?.username}</p>
      <p>Role: {session?.user?.role}</p>
    </div>
  );
}
*/

// Option B: Using auth() in server components
/*
import { auth } from "@/auth";

export default async function SomeServerComponent() {
  const session = await auth();
  
  return (
    <div>
      <p>Username: {session?.user?.username}</p>
      <p>Role: {session?.user?.role}</p>
    </div>
  );
}
*/

// ============================================
// 5. MAKING API CALLS WITH SESSION TOKEN
// ============================================

// lib/api.js - Helper for authenticated API calls
/*
import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function fetchWithAuth(endpoint, options = {}) {
  const session = await getSession();
  
  if (!session?.user?.backendToken) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.user.backendToken}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error('API request failed');
  }

  return response.json();
}

// Usage:
import { fetchWithAuth } from '@/lib/api';

const students = await fetchWithAuth('/api/v1/students');
const classes = await fetchWithAuth('/api/v1/classes');
*/

// ============================================
// KEY CHANGES SUMMARY
// ============================================
/*
BEFORE (with Zustand):
❌ const { user } = useAuthStore();
❌ State disappears on refresh
❌ Manual state management
❌ Client-side only

AFTER (with NextAuth):
✅ const user = session?.user;
✅ Persists across refreshes
✅ Automatic state management
✅ Server + Client side

ALL YOUR ROLE-BASED LOGIC WORKS THE SAME!
Just replace useAuthStore with session data.
*/
