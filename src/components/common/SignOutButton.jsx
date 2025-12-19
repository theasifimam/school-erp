// ============================================
// 6. components/SignOutButton.jsx
// ============================================
"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SignOutButton({ children }) {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/login" })}
      variant="destructive"
      className="w-full"
    >
      {children}
    </Button>
  );
}
