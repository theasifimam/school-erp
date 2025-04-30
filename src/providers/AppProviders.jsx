"use client";

import { ReactNode } from "react";
import { QueryProvider } from "./QueryProvider";

export function AppProviders({ children }) {
  return <QueryProvider>{children}</QueryProvider>;
}
