"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "./globals.css";
import TopNavbar from "@/components/TopNavbar";
import { Toaster } from "sonner";
import { AppProviders } from "@/providers/AppProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const isAuthenticated = true; // Replace with your authentication logic
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProviders>
          {!["/login", "/register"].includes(
            typeof window !== "undefined" ? window?.location?.pathname : ""
          ) ? (
            <div className="flex h-screen overflow-hidden">
              {/* Sidebar */}
              {isAuthenticated && <Sidebar />}
              <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                {isAuthenticated && <TopNavbar />}

                {/* Main Content (Scrollable) */}
                <main className="flex-1 overflow-auto">{children}</main>
              </div>
            </div>
          ) : (
            // Show only children (Login/Register)
            <>{children}</>
          )}
          <Toaster
            position="top-right"
            toastOptions={{
              className:
                "!rounded-3xl bg-white shadow-xl border border-gray-200 text-lg text-gray-800",
              duration: 3000, // optional: auto dismiss after 3s
            }}
          />
        </AppProviders>
      </body>
    </html>
  );
}
