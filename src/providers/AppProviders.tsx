"use client";

import { ReactNode } from "react";
import { QueryProvider } from "./QueryProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
