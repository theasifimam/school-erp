"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "./globals.css";
import TopNavbar from "@/components/TopNavbar";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {!["/login", "/register"].includes(
          typeof window !== "undefined" ? window?.location?.pathname : ""
        ) ? (
          <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar />
            <div className="flex-1 flex flex-col">
              {/* Top Navbar */}
              <TopNavbar />

              {/* Main Content (Scrollable) */}
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
          </div>
        ) : (
          // Show only children (Login/Register)
          <>{children}</>
        )}
        <Toaster
          toastOptions={{
            className:
              "!rounded-full bg-white shadow-xl border border-gray-200 text-sm text-gray-800",
            duration: 3000, // optional: auto dismiss after 3s
          }}
        />
      </body>
    </html>
  );
}
