"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/state/stores/authStore";

// Auth pages that don't need layout
const AUTH_ROUTES = ["/login", "/register"];

export default function AuthGuard({ children }) {
  const { isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Don't do anything if auth state is still loading
    if (typeof isAuthenticated === "undefined") {
      return;
    }

    const isAuthPage = AUTH_ROUTES.includes(pathname);

    // If on auth page and authenticated, redirect to home
    if (isAuthenticated && isAuthPage) {
      router.replace("/");
      return;
    }

    // If on protected page and not authenticated, redirect to login
    if (!isAuthenticated && !isAuthPage) {
      router.replace("/login");
      return;
    }

    // If we get here, we're in the correct place, so stop loading
    setIsLoading(false);
  }, [isAuthenticated, pathname, router]);

  // Don't render children until we know we're on the right page
  if (isLoading && typeof isAuthenticated !== "undefined") {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return children;
}
