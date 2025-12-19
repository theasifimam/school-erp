// app/ClientLayout.js - CLIENT COMPONENT
"use client";

import { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/common/Sidebar";
import { Toaster } from "sonner";
import { AppProviders } from "@/providers/AppProviders";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/state/stores/authStore";
import TopNavbar from "@/components/common/TopNavbar";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

// Auth pages that don't need layout
const AUTH_ROUTES = ["/login", "/register"];

export default function ClientLayout({ children }) {
  const { isAuthenticated } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const [previousPathname, setPreviousPathname] = useState(pathname);

  const handleResize = useCallback(() => {
    if (typeof window !== "undefined") {
      setIsOpen(window.innerWidth >= 1024);
    }
  }, []);

  useEffect(() => {
    handleResize();
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

  useEffect(() => {
    if (pathname !== previousPathname) {
      setPreviousPathname(pathname);
      if (isMobileOpen) {
        setIsMobileOpen(false);
      }
    }
  }, [pathname, previousPathname, isMobileOpen]);

  const isAuthPage = AUTH_ROUTES.includes(pathname);
  const layoutProps = {
    setIsOpen,
    isOpen,
    isMobileOpen,
    setIsMobileOpen,
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <AppProviders>
          {!isAuthPage ? (
            <div className="flex h-screen overflow-hidden w-full">
              <Sidebar {...layoutProps} />
              <div className="flex-1 flex flex-col w-100">
                <TopNavbar {...layoutProps} />
                <main className="flex-1 overflow-auto p-6 pt-0 bg-gray-50 dark:bg-background">
                  {children}
                </main>
              </div>
            </div>
          ) : (
            <main className="flex-1 overflow-auto p-6 pt-0 bg-gray-50 dark:bg-background">
              {children}
            </main>
          )}

          <Toaster
            position="top-right"
            toastOptions={{
              className:
                "!rounded-3xl bg-white text-foreground border border-gray-50 dark:border-gray-900 shadow-xl overflow-hidden",
              style: {
                color: "hsl(var(--foreground))",
              },
              duration: 3000,
            }}
          />
        </AppProviders>
      </SessionProvider>
    </ThemeProvider>
  );
}
