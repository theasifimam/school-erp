"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/common/Sidebar";
import "./globals.css";
import { Toaster } from "sonner";
import { AppProviders } from "@/providers/AppProviders";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/state/stores/authStore";
import TopNavbar from "@/components/common/TopNavbar";

// Font optimization - preload fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Ensures text remains visible during font loading
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Auth pages that don't need layout
const AUTH_ROUTES = ["/login", "/register"];

export default function RootLayout({ children }) {
  const { isAuthenticated } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false); // Start closed on mobile, will adjust in effect
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const [previousPathname, setPreviousPathname] = useState(pathname);

  // Responsive sidebar handler - memoized for performance
  const handleResize = useCallback(() => {
    if (typeof window !== "undefined") {
      setIsOpen(window.innerWidth >= 1024);
    }
  }, []);

  // Setup responsive behavior
  useEffect(() => {
    // Initialize based on current size
    handleResize();

    // Debounced resize handler for better performance
    let resizeTimer;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, [handleResize]);

  // Only close mobile sidebar on page navigation, not on every pathname change
  useEffect(() => {
    // Check if pathname actually changed (real navigation occurred)
    if (pathname !== previousPathname) {
      setPreviousPathname(pathname);
      if (isMobileOpen) {
        setIsMobileOpen(false);
      }
    }
  }, [pathname, previousPathname, isMobileOpen]);

  // Detect if we're on an auth page
  const isAuthPage = AUTH_ROUTES.includes(pathname);

  // Layout props for children components
  const layoutProps = {
    setIsOpen,
    isOpen,
    isMobileOpen,
    setIsMobileOpen,
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProviders>
          {!isAuthPage ? (
            <div className="flex h-screen overflow-hidden">
              {/* Sidebar with conditional rendering for authenticated users */}
              {isAuthenticated && <Sidebar {...layoutProps} />}

              <div className="flex-1 flex flex-col">
                {/* Top Navbar with conditional rendering */}
                {isAuthenticated && <TopNavbar {...layoutProps} />}

                {/* Main Content (Scrollable) */}
                <main className="flex-1 overflow-auto">{children}</main>
              </div>
            </div>
          ) : (
            // Auth pages receive children directly without layout
            children
          )}

          <Toaster
            position="top-right"
            toastOptions={{
              className:
                "!rounded-3xl bg-white shadow-xl border border-gray-200 text-lg text-gray-800",
              duration: 3000,
            }}
          />
        </AppProviders>
      </body>
    </html>
  );
}
