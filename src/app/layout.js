// app/layout.js - SERVER COMPONENT
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/misc/ClientLayout"; // Your existing layout as client component

export const metadata = {
  title: "Imam's Academy - School ERP",
  description:
    "A comprehensive school ERP system to manage all your academic and administrative needs efficiently.",
};

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
//   display: "swap",
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
//   display: "swap",
// });

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      //  className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
