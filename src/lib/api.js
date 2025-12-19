// ============================================
// 8. lib/api.js - Helper for authenticated API calls
// ============================================
import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function fetchWithAuth(endpoint, options = {}) {
  const session = await getSession();

  if (!session?.user?.backendToken) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.user.backendToken}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}
