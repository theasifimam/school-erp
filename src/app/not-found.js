"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BookX, ArrowLeft, Home, Library, Users, Settings } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-full  overflow-y-clip flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-500 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-2xl shadow-lg overflow-hidden border-0 dark:border p-0 dark:border-gray-700 rounded-4xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <motion.h1
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-6xl font-bold text-gray-800 dark:text-white mb-2"
              >
                404
              </motion.h1>
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Oops! Page Not Found
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                The page you're looking for doesn't exist or has been moved.
                Here are some helpful links instead:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {[
                {
                  icon: <Library size={20} className="text-blue-600" />,
                  title: "Library",
                  href: "/library",
                },
                {
                  icon: <Users size={20} className="text-green-600" />,
                  title: "Student Portal",
                  href: "/student",
                },
                {
                  icon: <Settings size={20} className="text-purple-600" />,
                  title: "Administration",
                  href: "/administration",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={item.href}
                    className="flex flex-col items-center justify-center py-2 px-4 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700"
                  >
                    <div className="mb-1">{item.icon}</div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {item.title}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 p-6 bg-gray-50 dark:bg-gray-800/50">
            <Button
              variant="outline"
              className="w-full lg:w-auto gap-2"
              onClick={() => router.back()}
            >
              <ArrowLeft size={16} />
              Go Back
            </Button>
            <Button className="w-full lg:w-auto gap-2" asChild>
              <Link href="/">
                <Home size={16} />
                Back to Home
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
