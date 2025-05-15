"use client";

import { QueryProvider } from "./QueryProvider";

export function AppProviders({ children }) {
  return <QueryProvider>{children}</QueryProvider>;
}
